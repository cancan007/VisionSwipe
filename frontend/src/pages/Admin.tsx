import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { IconContext } from "react-icons";
import { FcAddImage } from "react-icons/fc";
import { loadAllTx, loadItems, loadMarket } from "../hooks/market/interactions";
import { loadNFT } from "../hooks/nft/interactions";
import {
  loadAccount,
  loadNetwork,
  loadProvider,
} from "../hooks/provider/interactions";
import { useAppDispatch, useAppSelector } from "../hooks/useGeneral";
import { create as ipfsHttpClient, urlSource } from "ipfs-http-client";
import { createDispatchHook } from "react-redux";
import { useCreateNFT } from "../hooks/api/admin/useCreateNFT";
import { useCreateMarketItem } from "../hooks/api/admin/useCreateMarketItem";
import { allowedNodeEnvironmentFlags } from "process";
import { fetchAuthors } from "../hooks/api/admin/useFetchAuthors";
import {
  uploadFileToIpfs,
  uploadJsonToIpfs,
} from "../hooks/api/admin/uploadFlieToIpfs";
//import { pinataDedicatedDomain } from "../utils/admin/constants";
import { GridItemsTable } from "../components/GridItemsTable";
import { useCancelMarketItem } from "../hooks/api/admin/useCancelMarketItem";
import { BigNumber } from "ethers";

interface Image {
  id: number;
  src: string;
}
interface pageProps {
  items: boolean;
}
const initialItemsPageState = {
  items: false,
};

export const Admin = () => {
  const auth = useAppSelector((state) => state.provider.authentication);
  const [itemsPage, setItemsPage] = useState<pageProps>(initialItemsPageState);
  const [itemType, setItemType] = useState<string>("items");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const provider = useAppSelector((state) => state.provider.connection);
  const nft = useAppSelector((state) => state.nft.contract);
  const market = useAppSelector((state) => state.market.contract);
  const items = useAppSelector((state) => state.market.items);
  const soldItems = useAppSelector((state) => state.market.soldItems);
  const cancelledItems = useAppSelector((state) => state.market.cancelledItems);
  const networkHandler = async () => {
    await window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: /*"0xa869"*/ "0x5" }],
      })
      .catch((err: any) => (window.location.href = "/"));
    //window.location.href = '/dashboard';
  };
  const loadBlockchainData = async () => {
    let account: string;
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(dispatch, provider);
    const nft = await loadNFT(dispatch, provider, chainId);
    const market = await loadMarket(dispatch, provider, chainId);
    const authors = await fetchAuthors({ market: market });
    account = await loadAccount(dispatch, provider);
    const author = authors.find((u) => u === account);
    if (!author) {
      window.location.href = "/";
    }
    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      account = await loadAccount(dispatch, provider);
      const authors = await fetchAuthors({ market: market });
      const author2 = authors.find((u) => u === account);
      if (!author2) {
        window.location.href = "/";
      }
    });
    //subscribeToEvents(dispatch, casino);
    await loadAllTx(dispatch, market, nft, provider);
    await loadItems(dispatch, market, nft);
  };
  const dispatch = useAppDispatch();
  const client = ipfsHttpClient({ url: "http://localhost:5001" });
  const [info, setInfo] = useState<Partial<nftType>>();
  const [images, setImages] = useState<Image[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("drop");
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const addImagesToIpfs = async () => {
    if (acceptedFiles.length === 0) {
      alert("Please add item images");
      return;
    }
    const ipfsImages: Array<string> = [];
    for (let i = 0; i < acceptedFiles.length; i++) {
      /*let res = await client.add({content: acceptedFiles[i]});
            let url = `https://ipfs.io/ipfs/${res.cid}`;*/
      let res = await uploadFileToIpfs(acceptedFiles[i]);
      let url = `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`; // public gateway: so slow to show image
      //let url = `https://${pinataDedicatedDomain}/ipfs/${res.IpfsHash}`; // dedicated gateway: restricted gateway
      ipfsImages.push(url);
    }
    setInfo((prevState: any) => ({ ...prevState, images: ipfsImages }));
    alert(`Succeeded to add ${acceptedFiles.length} images to IPFS`);
  };

  const onDropRejected = useCallback(() => {
    console.log("Files are rejected");
  }, []);

  const onDropAccepted = useCallback(() => {
    console.log("File accepted");
  }, []);

  const { data: nftTx, mutate: mutateCreateNft } = useCreateNFT({
    onSuccess: (result) => {
      if (
        !info ||
        !info.price ||
        !info.priceUnit ||
        !info.feePercent ||
        !provider ||
        !market ||
        !nft
      )
        return;
      mutateCreateMarketItem({
        provider,
        market,
        nft,
        tokenId: result,
        price: info?.price,
        priceUnit: info?.priceUnit,
        feePercent: info?.feePercent,
      });
    },
  });
  const { data: marketTx, mutate: mutateCreateMarketItem } =
    useCreateMarketItem({
      onSuccess: (result) => {
        alert("Succeeded to create market item");
        window.location.href = "/buildings";
      },
    });
  const createItemHandler = async () => {
    if (
      !info ||
      !info.name ||
      !info.buildingType ||
      !info.saleType ||
      !info.description ||
      !info.priceUnit ||
      !info.price ||
      !info.address ||
      !info.images?.length ||
      !info.feePercent ||
      !info.company ||
      !info.companyEmail
    ) {
      alert("Filll all forms");
      return;
    }
    const building: nftType = {
      name: info.name,
      buildingType: info.buildingType,
      saleType: info.saleType,
      description: info.description,
      priceUnit: info.priceUnit,
      price: info.price,
      feePercent: info.feePercent,
      address: info.address,
      images: info.images,
      company: info.company,
      companyEmail: info.companyEmail,
    };
    const buildingJson = JSON.stringify(building);
    //const res = await client.add(buildingJson);
    const res = await uploadJsonToIpfs(buildingJson);
    //const url = `https://ipfs.io/ipfs/${res.cid}`;
    //const url = `https://${pinataDedicatedDomain}/ipfs/${res.IpfsHash}`;
    const url = `https://gateway.pinata.cloud/ipfs/${res.IpfsHash}`;
    mutateCreateNft({ provider, nft, tokenURI: url });
  };

  const { mutate: mutateCancelItem } = useCancelMarketItem({
    onSuccess: () => {
      alert("Succeeded to cancel the item");
      loadItems(dispatch, market, nft);
      loadAllTx(dispatch, market, nft, provider);
    },
  });

  const cancelItem = (itemId: BigNumber) => {
    mutateCancelItem({ provider, market, itemId });
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      onDropRejected,
      onDropAccepted,
      multiple: true,
      accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
    });

  useLayoutEffect(() => {
    networkHandler();
    loadBlockchainData();
  }, []);

  return (
    <>
      {itemsPage.items ? (
        <Container
          maxWidth={"900px"}
          className="h-screen flex flex-col justify-start items-center mt-12"
        >
          <Box className="w-full flex flex-col items-center my-4">
            <Text className="text-3xl">Items</Text>
            <Box className="w-full flex flex-row items-center justify-end">
              <a href="/" className="align-self-end mr-5">
                <Box>
                  <Text className="text-blue-500 hover:text-blue-200">
                    Home
                  </Text>
                </Box>
              </a>
              <Text
                onClick={() => setItemsPage(initialItemsPageState)}
                className="text-pink-500 hover:text-pink-200"
              >
                Admin
              </Text>
            </Box>
          </Box>
          <RadioGroup onChange={(value) => setItemType(value)} value={itemType}>
            <Stack direction={"row"} spacing={5}>
              <Radio value="selling">Selling</Radio>
              <Radio value="sold">Sold</Radio>
              <Radio value="cancelled">Cancelled</Radio>
            </Stack>
          </RadioGroup>
          <GridItemsTable
            items={
              itemType === "sold"
                ? soldItems
                : itemType === "cancelled"
                ? cancelledItems
                : itemType === "selling"
                ? items
                : []
            }
            admin={true}
            cancel={itemType === "selling" && cancelItem}
          />
        </Container>
      ) : (
        <Container
          maxWidth={"600px"}
          className="h-screen flex flex-col justify-center mt-32"
        >
          <Heading>
            <title>Admin</title>
          </Heading>
          <Box className="flex flex-col items-center my-4">
            <Text className="text-3xl">Admin page</Text>
            <Box className="w-full flex flex-row items-center justify-end">
              <a href="/" className="align-self-end">
                <Box>
                  <Text className="text-blue-500 hover:text-blue-200 mr-5">
                    Home
                  </Text>
                </Box>
              </a>
              <Text
                onClick={() => setItemsPage({ ...itemsPage, items: true })}
                className="text-pink-500 hover:text-pink-200"
              >
                Items
              </Text>
            </Box>
          </Box>
          <Box className="flex flex-col items-center gap-y-4">
            <Input
              onChange={(e: any) => setInfo({ ...info, name: e.target.value })}
              type="text"
              className="px-3 py-1"
              placeholder="Building name"
            />
            <RadioGroup
              onChange={(value) => setInfo({ ...info, buildingType: value })}
              value={info?.buildingType}
            >
              <Stack direction={"row"} spacing={5}>
                <Radio value="house">House</Radio>
                <Radio value="apartment">Apartment</Radio>
                <Radio value="hotel">Hotel</Radio>
                <Radio value="building">Building</Radio>
              </Stack>
            </RadioGroup>
            <RadioGroup
              onChange={(value) => setInfo({ ...info, saleType: value })}
              value={info?.saleType}
            >
              <Stack direction={"row"} spacing={5}>
                <Radio value="sell">Sell</Radio>
                <Radio value="rent">Rent</Radio>
                <Radio value="book">Book</Radio>
              </Stack>
            </RadioGroup>
            <Textarea
              onChange={(e: any) =>
                setInfo({ ...info, description: e.target.value })
              }
              value={info?.description}
              placeholder="Description"
            />
            <Box display={"flex"} flexDirection={"column"}>
              <RadioGroup
                onChange={(value) => setInfo({ ...info, priceUnit: value })}
                value={info?.priceUnit}
              >
                <Stack direction={"row"} spacing={5}>
                  <Radio value="1">Yen</Radio>
                  <Radio value="0">USD</Radio>
                </Stack>
              </RadioGroup>
              <Input
                value={info?.price}
                onChange={(e: any) =>
                  setInfo({ ...info, price: e.target.value })
                }
                type="number"
                placeholder="Price"
              />
            </Box>
            <Input
              value={info?.feePercent}
              onChange={(e: any) =>
                setInfo({ ...info, feePercent: e.target.value })
              }
              type="number"
              placeholder="Fee Percent"
            />
            <Input
              value={info?.address}
              onChange={(e: any) =>
                setInfo({ ...info, address: e.target.value })
              }
              type="text"
              placeholder="Address"
            />
            <Input
              value={info?.company}
              onChange={(e: any) =>
                setInfo({ ...info, company: e.target.value })
              }
              type="text"
              placeholder="Company"
            />
            <Input
              value={info?.companyEmail}
              onChange={(e: any) =>
                setInfo({ ...info, companyEmail: e.target.value })
              }
              type="email"
              placeholder="Company Email"
            />
            <div
              {...getRootProps()}
              className="h-[300px] rounded-lg w-full border-2 flex flex-col items-center justify-center relative"
            >
              <IconContext.Provider
                value={{ className: "absolute -z-1 w-full", size: "2em" }}
              >
                <FcAddImage />
              </IconContext.Provider>
              <input {...getInputProps()} className="w-full h-full" />
              <Box className="absolute z-1 grid grid-cols-4 w-full h-full gap-2 overflow-y-auto">
                {images ? (
                  images.map((image: Image, i: number) => (
                    <Image
                      src={image.src}
                      className="w-[130px] h-[100px] object-cover"
                    />
                  ))
                ) : (
                  <></>
                )}
              </Box>
            </div>
            <Button
              onClick={() =>
                addImagesToIpfs().catch((err) => alert("Error occured"))
              }
              colorScheme={"pink"}
              variant={"outline"}
            >
              Upload Images
            </Button>
            <Button
              onClick={() => createItemHandler()}
              colorScheme={"blue"}
              variant={"outline"}
            >
              Create NFT
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};
