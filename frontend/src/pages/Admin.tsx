


import { Box, Button, Container, Heading, Image, Input, Radio, RadioGroup, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import { IconContext } from 'react-icons';
import {FcAddImage} from "react-icons/fc" 

interface Image {
    id: number;
    src: string;
}

export const Admin = () => {
    const [buildingType, setBuildingType] = useState<string>();
    const [saleType, setSaleType] = useState<string>();
    const [files, setFiles] = useState<File[]>([]);
    const [images, setImages] = useState<Image[]>([]);
    const onDrop = useCallback((acceptedFiles:File[]) => {
        console.log("drop")
        acceptedFiles.map((file, index) => {
          setFiles((prevState) => [
            ...prevState,file
          ])
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

   const onDropRejected = useCallback(()=>{
     console.log("Files are rejected")
   },[])

   const onDropAccepted = useCallback(()=>{
    console.log("File accepted");
   },[])

    const {acceptedFiles,getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, onDropRejected, onDropAccepted,multiple: true, accept:{"image/*":[".png", ".jpeg", ".jpg", ".svg"]}})

    useEffect(()=>{
        console.log(acceptedFiles)
    },[acceptedFiles])

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
      <Input type="text" className="px-3 py-1" placeholder='Building name'/>
      <RadioGroup onChange={(e:any)=>setBuildingType(e.target.value)} value={buildingType}>
      <Stack direction={"row"} spacing={5}>
        <Radio value="house">House</Radio>
        <Radio value="apartment">Apartment</Radio>
        <Radio value="hotel">Hotel</Radio>
        <Radio value="building">Building</Radio>
      </Stack>
      </RadioGroup>
      <RadioGroup onChange={(e:any)=>setSaleType(e.target.value)} value={saleType}>
      <Stack direction={"row"} spacing={5}>
        <Radio value="sell">Sell</Radio>
        <Radio value="rent">Rent</Radio>
        <Radio value="book">Book</Radio>
    </Stack>
    </RadioGroup>
    <Textarea placeholder='Description'/>
    <Box display={"flex"} flexDirection={"column"}>
    <Stack direction={"row"} spacing={5}>
        <Radio value="yen">Yen</Radio>
        <Radio value="usd">USD</Radio>
    </Stack>
    <Input type="number" placeholder='Price'/>
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
    <Button colorScheme={'blue'} variant={'outline'}>Save</Button>
    </Box>
    </Container>
  )
}
