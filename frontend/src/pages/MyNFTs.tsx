import { Box, Container, Text, Image } from "@chakra-ui/react";




export const MyNFTs = () => {


    return(
        <body className="flex flex-col">
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
          <Box>
            
          </Box>
        </body>
    );
}