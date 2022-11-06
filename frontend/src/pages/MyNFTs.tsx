import { Box, Container, Text, Image } from "@chakra-ui/react";
import { useEffect, useLayoutEffect } from "react";
import { useFetchMyNFTs } from "../hooks/api/my-nfts/useFetchMyNFTs";
import { FetchItemResult } from "../hooks/api/nft-buildings/useFetchItems";
import { loadMyItems } from "../hooks/market/interactions";
import { useAppDispatch, useAppSelector } from "../hooks/useGeneral";
import { formEth, loadBlockchainData } from "../utils/general";




export const MyNFTs = () => {
    const dispatch = useAppDispatch();
    const market = useAppSelector(state => state.market.contract);
    const nft = useAppSelector(state => state.nft.contract);
    const provider = useAppSelector(state => state.provider.connection);
    const myItems:FetchItemResult[] = useAppSelector(state => state.market.myItems);
    //const {data:gettingMyNfts, isLoading: isLoadingMyNfts} = useFetchMyNFTs({market, nft, provider});
    useLayoutEffect(() => {
        loadBlockchainData(dispatch);
    },[])
    useEffect(() => {
        if(!market || !nft || !provider) return;
        loadMyItems(dispatch, market, nft, provider);
    },[market, nft, provider])

    return(
        <body className="flex flex-col items-center">
          <header className="w-full h-auto bg-black text-white">
            <Box className="flex flex-row items-center justify-between px-10">
              <Text className="text-5xl">My NFTs</Text>
              <Image height={'100px'} width={'auto'} src='https://res.cloudinary.com/dbfpsigax/image/upload/v1667535955/VisionSwipe/image-from-rawpixel-id-6751733-original_ftvcjr.png'/>
              <Box className="flex flex-row items-center gap-x-3">
                <a href="/nft-buildings">
                    <Text className="text-pink-500 hover:text-pink-200">NFT buildings</Text>
                </a>
                <a href="/">
                    <Text className="text-pink-500 hover:text-pink-200">Home</Text>
                </a>
              </Box>
            </Box>
          </header>
          <Box className="w-3/5 min-w-[768px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
            {myItems ? myItems.map((item, i:number) => (
              <Box className="rounded-lg border-2 flex flex-col items-center">
                {item.image && !item.images ? (
                  <Image src={item.image} className="object-cover rounded-t-lg"/>
                ) :
                !item.image && item.images ? (
                    <Image src={item.images[0]} className="object-cover rounded-t-lg"/>
                ) : (
                    <></>
                )}
                <Box className="flex flex-col items-start justify-center">
                  <Text className="text-xl font-semibold">{item.name}</Text>
                  <Text className="text-sm">Bought price: {formEth(item.price)}{formEth(item.priceUnit) === '0' ? '$' : 'Yen'}</Text>
                </Box>
            </Box>
            )): (
                <></>
            )}
          </Box>
        </body>
    );
}