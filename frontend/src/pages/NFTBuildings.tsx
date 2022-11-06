import "../buildings.css"
import visionSwipe from "../assets/vision-swipe.png"
import house from "../assets/house.png"
import kakurega from "../assets/kakurega.png"
import { FadeIn } from "../animations/FadeIn"
import { useAppDispatch, useAppSelector } from "../hooks/useGeneral"
import { FetchItemResult, useFetchItems } from "../hooks/api/nft-buildings/useFetchItems"
import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import { loadAccount, loadNetwork, loadProvider } from "../hooks/provider/interactions"
import { loadNFT } from "../hooks/nft/interactions"
import { loadItems, loadMarket } from "../hooks/market/interactions"
import { NFTBuildingDetailModal } from "../components/nft-buildings/NFTBuildingDetail"
import { useDisclosure } from "@chakra-ui/react"
import { EmailFormModal } from "../components/nft-buildings/EmailFormModal"

export const NFTBuildings =() =>{
  const dispatch = useAppDispatch()
  const [itemInfo, setItemInfo] = useState<FetchItemResult>();
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const provider = useAppSelector(state => state.provider.connection);
  const market = useAppSelector(state => state.market.contract);
  const nft = useAppSelector(state => state.nft.contract);
  const gettingItems = useAppSelector(state => state.market.items);
  console.log(gettingItems)
  const loadBlockchainData = async () => {
    const provider = loadProvider(dispatch);
    const chainId = await loadNetwork(dispatch, provider);
    const nft = await loadNFT(dispatch, provider, chainId)
    const market = await loadMarket(dispatch, provider, chainId);
    loadAccount(dispatch,provider)
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    })
    window.ethereum.on('accountsChanged', () => {
        loadAccount(dispatch, provider);
    })
  }

  //const {data: gettingItems, refetch: refetchItems} = useFetchItems({ market, nft});

  useLayoutEffect(() => {
    loadBlockchainData()
  },[])

  useEffect(() => {
    if(!nft || !market){return};
    loadItems(dispatch, market, nft);
  },[nft, market])

    return(
        <body>
            <header className="flex flex-col text-white">
                <div className="nft-buildings-background-image flex flex-row justify-between">
                    <p className="text-5xl pt-5 pl-10 fadeIn">NFT Buildings</p>
                    <div className="flex flex-row items-center mr-10 gap-x-4">
                      <a href="/my-nfts">
                        <p className="text-xl hover:text-blue-300 focused:text-blue-500">My NFTs</p>
                      </a>
                    <a href="/buildings">
                      <p className="text-xl hover:text-blue-300 focused:text-blue-500">Buildings</p>
                    </a>
                    <a href="/">
                        <p className="text-xl hover:text-blue-300 focused:text-blue-500">Home</p>
                    </a>
                    </div>
                </div>
                <div className="bg-black w-full flex flex-col items-center py-2">
                  <img className="fadeIn h-[50px] w-auto mb-2" src={visionSwipe} />
                  <div className="flex flex-col md:flex-row items-center w-4/5">
                    <input className='bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type='text' placeholder="Search from buiding name"/>
                    <div className="flex flex-row">
                    <select className="ml-5 block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option hidden>Select building type</option>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Hotel</option>
                        <option>Builidng</option>
                    </select>
                    <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" hidden>Select contact type</option>
                        <option value="">Buy</option>
                        <option value="">Rent</option>
                        <option value="">Book</option>
                    </select>
                    <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value=""hidden>Select price range</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center w-4/5 my-3">
                   <input className='bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type='text' placeholder="Search from address"/>
                   <div className="flex flex-row">
                   <select className="ml-5 block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option hidden>Select City</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                    </select>
                    <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="" hidden>Select state</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value=""hidden>Select country</option>
                        <option value=""></option>
                        <option value=""></option>
                        <option value=""></option>
                    </select>
                    </div>
                  </div>
                </div>
            </header>
            <section className="flex flex-col items-center w-full mt-10">
             <div className="text-black w-3/5 flex flex-row items-end justify-end">
               <a href="" className="mr-1 hover:text-blue-300">1</a>
               <a href="" className="mr-1 hover:text-blue-300">2</a>
               <a href="" className='hover:text-blue-300'>3</a>
               <p>...</p>
               <a href="" className="mx-1 hover:text-blue-300">8</a>
               <a href="" className='hover:text-blue-300'>Next</a>
             </div>
              {gettingItems && gettingItems.map((item:FetchItemResult, i:number) => {
                return(
                    
                  <div key={i} onClick={() => setItemInfo(item)} className="w-full px-2 md:w-3/5 h-auto">
                 <div className="flex flex-row h-[144px] justify-start bg-gray-300 mt-5 rounded-lg cursor-pointer hover:opacity-50 overflow-y-auto">
                <img alt="" src={item.images ? item?.images[0] : item.image} className="w-1/3 h-auto object-cover rounded-l-lg"/>
                <div className="flex flex-col items-start justify-center text-black ml-5">
                    <p className="text-sm">Building name: {item.name}</p>
                    <p className="text-sm">Address: {item.address}</p>
                    <p className="text-sm">Descripton: {item.description}</p>
                </div>
              </div>
              </div>
                )
              })}
            </section>
            {itemInfo && (
                <NFTBuildingDetailModal {...itemInfo} setItemInfo={setItemInfo}/>
            )}
            <footer className="flex flex-row justify-center mt-10">
          <p className="text-black text-sm">CopyRight (C) 2022 VisionSwipe All rights reserved.</p>
        </footer>
        </body>
    )
}