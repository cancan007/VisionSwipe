
import { Box, Button, Container, Heading, Image, Input, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { IconContext } from 'react-icons';
import {FcAddImage} from "react-icons/fc" 
import { loadMarket } from '../hooks/market/interactions';
import { loadNFT } from '../hooks/nft/interactions';
import { loadAccount, loadNetwork, loadProvider } from '../hooks/provider/interactions';
import { useAppDispatch, useAppSelector } from '../hooks/useGeneral';
import { create as ipfsHttpClient, urlSource} from "ipfs-http-client"
import { createDispatchHook } from 'react-redux';
import { useCreateNFT } from '../hooks/api/admin/useCreateNFT';
import { useCreateMarketItem } from '../hooks/api/admin/useCreateMarketItem';

interface Image {
    id: number;
    src: string;
}

interface nftType {
  name: string;
  buildingType: string;
  saleType: string;
  description: string;
  priceUnit: string;
  price: number;
  address: string;
  images: string[];
}

export const Admin = () => {
  const auth = useAppSelector(state => state.provider.authentication);
  const networkHandler = async () => {
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xa869" }]
    }).catch((err:any) => window.location.href = '/')
    //window.location.href = '/dashboard';
    }
    const loadBlockchainData = async () => {
      let account;
      const provider = loadProvider(dispatch);
      const chainId = await loadNetwork(dispatch, provider);
      const nft = await loadNFT(dispatch, provider, chainId)
      const market = await loadMarket(dispatch, provider, chainId);
      account = await loadAccount(dispatch, provider);
      if(account !== process.env.REACT_APP_METAMASK_PUBLIC_ADDRESS){
        window.location.href = '/';
      }
      window.ethereum.on('chainChanged', () => {
          window.location.reload();
      })

      window.ethereum.on('accountsChanged', async() => {
          account = await loadAccount(dispatch, provider);
          if(account !== process.env.REACT_APP_METAMASK_PUBLIC_ADDRESS){
            window.location.href = '/';
          }
      })
      //subscribeToEvents(dispatch, casino);
    }
    const dispatch = useAppDispatch();
    const client = ipfsHttpClient({url:'http://localhost:5001'});
    const [info, setInfo] = useState<Partial<nftType>>()
    const [images, setImages] = useState<Image[]>([]);
    const onDrop = useCallback((acceptedFiles:File[]) => {
        console.log("drop")
        acceptedFiles.map((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e:any) {
              setImages((prevState) => [
                ...prevState,
                { id: index, src: e.target.result },
              ]);
            };
            reader.readAsDataURL(file);
            return file;
          });
    }
   , [])

   
   const addImagesToIpfs = async() => {
    if(acceptedFiles.length === 0){
        alert("Please add item images");
        return
    }
    const ipfsImages: Array<string> = []
    for(let i=0; i < acceptedFiles.length; i++) {
        let res = await client.add({content: acceptedFiles[i]});
        let url = `https://ipfs.io/ipfs/${res.cid}`;
        ipfsImages.push(url);
        console.log(url);
        //setInfo((prevState:any) => ({...prevState, images: [...prevState.images, url]}))
    }
    setInfo((prevState:any) => ({...prevState, images: ipfsImages}));
    alert(`Succeeded to add ${acceptedFiles.length + 1} images to IPFS`);
}

   const onDropRejected = useCallback(()=>{
     console.log("Files are rejected")
   },[])

   const onDropAccepted = useCallback(()=>{
    console.log("File accepted");
   },[])

   const {data:nftTx, mutate:mutateCreateNft} = useCreateNFT();
   const {data:marketTx, mutate:mutateCreateMarketItem} = useCreateMarketItem();

    const {acceptedFiles,getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, onDropRejected, onDropAccepted,multiple: true, accept:{"image/*":[".png", ".jpeg", ".jpg", ".svg"]}})

    useLayoutEffect(() => {
      networkHandler();
        loadBlockchainData()
    }, [])

  return (
    
    <Container maxWidth={'600px'} className="h-screen flex flex-col justify-center">
      <Heading>
        <title>Admin</title>
      </Heading>
      <Box className="flex flex-col items-center my-4">
         <Text className="text-3xl">Admin page</Text>
         <a href="/" className="align-self-end">
         <Box >
          <Text className="text-blue-500 hover:text-blue-200">Home</Text>
         </Box>
         </a>
      </Box>
    <Box className="flex flex-col items-center gap-y-4">
      <Input onChange={(e:any) => setInfo({...info, name: e.target.value})} type="text" className="px-3 py-1" placeholder='Building name'/>
      <RadioGroup onChange={(value)=>setInfo({...info, buildingType: value})} value={info?.buildingType}>
      <Stack direction={"row"} spacing={5}>
        <Radio value="house">House</Radio>
        <Radio value="apartment">Apartment</Radio>
        <Radio value="hotel">Hotel</Radio>
        <Radio value="building">Building</Radio>
      </Stack>
      </RadioGroup>
      <RadioGroup onChange={(value)=>setInfo({...info, saleType: value})} value={info?.saleType}>
      <Stack direction={"row"} spacing={5}>
        <Radio value="sell">Sell</Radio>
        <Radio value="rent">Rent</Radio>
        <Radio value="book">Book</Radio>
    </Stack>
    </RadioGroup>
    <Textarea onChange={(e:any) => setInfo({...info, description: e.target.value})} value={info?.description} placeholder='Description'/>
    <Box display={"flex"} flexDirection={"column"}>
    <RadioGroup onChange={(value) => setInfo({...info, priceUnit: value})} value={info?.priceUnit}>
    <Stack direction={"row"} spacing={5}>
        <Radio value={1}>Yen</Radio>
        <Radio value={0}>USD</Radio>
    </Stack>
    </RadioGroup>
    <Input onChange={(e:any) => setInfo({...info, price: e.target.value})} type="number" placeholder='Price'/>
    </Box>
    <Input type="text" placeholder="Address"/>
    <div {...getRootProps()} className="h-[300px] rounded-lg w-full border-2 flex flex-col items-center justify-center relative">
      <IconContext.Provider value={{className: "absolute -z-1 w-full", size:"2em"}}>
      <FcAddImage/>
      </IconContext.Provider>
        <input {...getInputProps()} className="w-full h-full"/>
        <Box className="absolute z-1 grid grid-cols-4 w-full h-full gap-2 overflow-y-auto">
        {images ? images.map((image:Image, i:number) => (
            <Image src={image.src} className="w-[130px] h-[100px] object-cover" />
        ))
        : <></>}
        </Box>
    </div>
    <Button onClick={() => addImagesToIpfs()} colorScheme={'pink'} variant={'outline'}>Upload Images</Button>
    <Button colorScheme={'blue'} variant={'outline'}>Create NFT</Button>
    </Box>
    </Container>
  )
}
