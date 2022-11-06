import { Button, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { prependListener } from "process";
import { memo, useState } from "react"
import { Customer } from "./NFTBuildingDetail";



interface EmailFormProps{
    isOpen:boolean;
    onClose:() => void;
    customerRef: React.MutableRefObject<null>;
    handleBuy: () => void;
    itemId: string;
}

export const EmailFormModal = memo(({isOpen,onClose, customerRef, handleBuy, itemId}:EmailFormProps) => {
  const [customer, setCustomer] = useState<Partial<Customer>>()
  console.log(customerRef)
    return (
        <>
      {/*<Button onClick={onOpen}>Open Modal</Button>*/}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Customer Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form ref={customerRef}>
            <FormControl isRequired>
              <FormLabel>Your name</FormLabel>
              <Input onChange={(e:any) => setCustomer((pre)=>({...pre,name:e.target.value}))} name="customer_name" type={'text'}/>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Your email address</FormLabel>
                <Input onChange={(e:any) => setCustomer((pre)=>({...pre,email:e.target.value}))} name="customer_email" type='email' />
                <FormHelperText>We'll contact you with your email or contact number.</FormHelperText>
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Your contact number</FormLabel>
                <Input onChange={(e:any) => setCustomer((pre)=>({...pre,contact:e.target.value}))} name="customer_contact" type='tel' />
            </FormControl>
            <FormControl isRequired>
                <FormLabel>Your country</FormLabel>
                <Input onChange={(e:any) => setCustomer((pre)=>({...pre,country:e.target.value}))} name="customer_country" type='text' />
            </FormControl>
            <FormControl>
                <FormLabel>NFT item ID</FormLabel>
                <Input value={itemId} name="nft_id" type='text' />
            </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() =>{
              if(!customer || !customer.name || !customer.email || !customer.contact || !customer.country){
                alert('Please fill all forms');
                return
              };
              handleBuy();
              }}>
              Buy
            </Button>
            {/*<Button variant='ghost'>Secondary Action</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
})