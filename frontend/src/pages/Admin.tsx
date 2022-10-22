


import { Box, Button, Container, Image, Input, Radio, Stack, Text, Textarea } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';

interface Image {
    id: number;
    src: string;
}

export const Admin = () => {

    const [files, setFiles] = useState<any[]>([]);
    const [images, setImages] = useState<any[]>([]);
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
    <Box className="flex flex-col items-center gap-y-4">
      <Input type="text" className="px-3 py-1" placeholder='Building name'/>
      <Stack direction={"row"} spacing={5}>
        <Radio value="house">House</Radio>
        <Radio value="apartment">Apartment</Radio>
        <Radio value="hotel">Hotel</Radio>
        <Radio value="building">Building</Radio>
      </Stack>
      <Stack direction={"row"} spacing={5}>
        <Radio value="sell">Sell</Radio>
        <Radio value="rent">Rent</Radio>
        <Radio value="book">Book</Radio>
    </Stack>
    <Textarea placeholder='Description'/>
    <Box display={"flex"} flexDirection={"column"}>
    <Stack direction={"row"} spacing={5}>
        <Radio value="yen">Yen</Radio>
        <Radio value="usd">USD</Radio>
    </Stack>
    <Input type="number" placeholder='Price'/>
    </Box>
    <Input type="text" placeholder="Address"/>
    <div {...getRootProps()} className="h-[300px] rounded-lg w-full border-2 relative">
        <input {...getInputProps()} className="w-full h-full"/>
        <Box className="absolute z-1 grid-cols-4">
        {images ? images.map((image:Image, i:number) => (
            <Image src={image.src} className="w-[100px] h-[80px] object-cover"/>
        ))
        : <></>}
        {isDragActive ? <Text>Drop building images</Text> : <Text>Drop some building images or click</Text>}
        </Box>
    </div>
    <Button colorScheme={'blue'} variant={'outline'}>Save</Button>
    </Box>
    </Container>
  )
}
