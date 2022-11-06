import { Button, Text,FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

interface ConnectToMetamaskProps{
    isOpen: boolean;
    onClose: () => void;
    networkHandler:() =>void;
}

export const ConnectToMetamask = ({isOpen, onClose, networkHandler}: ConnectToMetamaskProps) => {

    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to Metamask</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'} alignItems="center">
            <Text>Please connect to Metamask on Avalanche network</Text>
            <Button colorScheme='blue' mt={5} onClick={networkHandler}>
              Connect
            </Button>
          </ModalBody>
          <ModalFooter>
            
            {/*<Button variant='ghost'>Secondary Action</Button>*/}
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}