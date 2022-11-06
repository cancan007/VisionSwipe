import { Button, Text,FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Box } from "@chakra-ui/react"
import { useRef } from "react";
import { FetchItemResult } from "../../hooks/api/nft-buildings/useFetchItems";
import { formEth } from "../../utils/general";


interface ItemDetailModalProps {
    isOpen: boolean;
    onClose: ()=>void;
    item: FetchItemResult;
}

export const ItemDetailModal = ({isOpen, onClose, item}: ItemDetailModalProps) => {
    
    const scrollElement:any = useRef(null)

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= scrollElement.current.offsetWidth
    }
    const scrollRight = () =>{
      scrollElement.current.scrollLeft += scrollElement.current.offsetWidth
    }

    return(
        <Modal size={'6xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>NFT Item Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} alignItems="center">
            <Box className="flex flex-row">
            <div className=" flex flex-row items-center w-full md:w-1/2 h-auto px-1 ">
              <button onClick={()=>scrollLeft()} className="h-0 w-0 border-y-8 border-y-transparent border-r-[16px] border-r-gray-600 hover:border-r-gray-300"></button>
                <div ref={scrollElement} id="slider" className="flex flex-row  mb-0  md:mx-1 overflow-x-scroll scroll-smooth">
                  {item.images ? item.images.map((image:string,i:number)=>{
                    return(
                      <img className="object-contain max-h-[250px] md:max-h-[500px]" src={image}/>
                    )
                  }) : 
                  item.image && (
                    <img className="object-contain max-h-[250px] md:max-h-[500px]" src={item.image}/>
                  )}
                </div>
                <button onClick={()=>scrollRight()} className="h-0 w-0 border-y-8 border-y-transparent border-l-[16px] border-l-gray-600 hover:border-l-gray-300"></button>
                </div>

                <Box className="flex flex-col items-start">
                    <Text className="text-2xl font-semibold">{item.name}</Text>
                    <Text>Company: {item.company}</Text>
                    <Text>Company Email: {item.companyEmail}</Text>
                  <Text>Address: {item.address}</Text> 
                  <Text>Building Type: {item.buildingType}</Text>
                  <Text>Sale Type: {item.saleType}</Text>
                  <Text>Price: {formEth(item.price)}{Number(formEth(item.priceUnit)) === 0 ? '$' : 'Yen'}</Text>
                  <Text>Description: {item.description}</Text>
                </Box>
            </Box>
            <Button colorScheme='blue' mt={5} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
          <ModalFooter>
            
            {/*<Button variant='ghost'>Secondary Action</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}