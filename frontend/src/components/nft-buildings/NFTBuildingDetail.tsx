import '../../detail.css'
import { FadeIn } from '../../animations/FadeIn'
import { FetchItemResult } from '../../hooks/api/nft-buildings/useFetchItems'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { convertToAvax, formEth } from '../../utils/general'
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { IconContext } from 'react-icons'
import { useAppSelector } from '../../hooks/useGeneral'
import { BigNumber } from 'ethers'

export const NFTBuildingDetailModal = memo((item:FetchItemResult & {setItemInfo: any})=>{
  const market = useAppSelector(state => state.market.contract);
  const [formedAVAX, setFormedAvax] = useState<BigNumber>()
  
  const scrollElement:any = useRef(null)

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= scrollElement.current.offsetWidth
    }
    const scrollRight = () =>{
      scrollElement.current.scrollLeft += scrollElement.current.offsetWidth
    }
    

    useEffect(() => {
      convertToAvax(market, item.priceUnit, item.price).then(res => {
        setFormedAvax(res);
      })
    },[market, item.price, item.priceUnit])

    return(
        <Box className="fixed top-8 bg-white bg-opacity-75 m-10 rounded-lg">
            <Box className={'w-full flex flex-row justify-end'}>
            <IconContext.Provider value={{className: "mt-3 mr-3", size:"2em"}}>
              <AiOutlineCloseCircle onClick={() => item.setItemInfo(undefined)}/>
            </IconContext.Provider>
            </Box>
            <section className="flex flex-col items-center ">
                <FadeIn>
              <div className="flex flex-col items-center md:flex-row md:justify-center w-full mt-5">
                <div className=" flex flex-row items-center w-full md:w-1/2 h-auto px-1 ">
              <button onClick={()=>scrollLeft()} className="h-0 w-0 border-y-8 border-y-transparent border-r-[16px] border-r-gray-600 hover:border-r-gray-300"></button>
                <div ref={scrollElement} id="slider" className="flex flex-row  mb-5 md:mb-0 mx-1 overflow-x-scroll scroll-smooth">
                  {item.images.map((image:string,i:number)=>{
                    return(
                      <img className="object-contain max-h-[500px]" src={image}/>
                    )
                  })}
                </div>
                <button onClick={()=>scrollRight()} className="h-0 w-0 border-y-8 border-y-transparent border-l-[16px] border-l-gray-600 hover:border-l-gray-300"></button>
                </div>
                <div className="building-info-section flex flex-col items-center justify-center w-4/5 md:w-1/2 p-1">
                  

                  <p className='mt-5'>Building name: {item.name}</p>
                  <p>Address: {item.address}</p> 
                  <Text>Building Type: {item.buildingType}</Text>
                  <Text>Sale Type: {item.saleType}</Text>
                  <Text>Price: {formEth(item.price)}{Number(formEth(item.priceUnit)) === 0 ? '$' : 'Yen'}</Text>
                  <Text>AVAX price: {formedAVAX ? formEth(formedAVAX) : null}</Text>
                  <Text>Description: {item.description}</Text>
                </div>
                
              </div>
              </FadeIn>
            </section>
        </Box>
    )
});