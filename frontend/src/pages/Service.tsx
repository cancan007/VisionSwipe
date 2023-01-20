import {
  Box,
  Center,
  Divider,
  Heading,
  Image,
  Text,
  Container,
} from "@chakra-ui/react";
import { Stack } from "react-bootstrap";
import {
  TranslateX1,
  TranslateX11,
  TranslateX2,
  TranslateX21TBlockchainIconImage,
  TranslateX21TBlockchainIconImage2,
  TranslateX21TBlockchainImage,
  TranslateX21TNFTIconImage,
  TranslateX21TNFTIconImage2,
  TranslateX21TNFTImage,
  TranslateX22,
} from "../animations/TranslateX";
import {
  TranslateX21TCryptoIconImage,
  TranslateY1,
  TranslateY12,
  TranslateY2,
} from "../animations/TranslateY";
import visionSwipe from "../assets/vision-swipe.png";

export const Service = () => {
  return (
    <Box
      pb={100}
      bg={"black"}
      w={"screen"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      textColor={"white"}
    >
      <Heading
        w={"100%"}
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        h={150}
      >
        <Image className="w-1/2 xl:w-auto" src={visionSwipe} ml={5} />
        <a href="/" className="mr-10">
          <Text
            fontSize={32}
            className="text-blue-500 hover:text-blue-200 font-thin"
          >
            Home
          </Text>
        </a>
      </Heading>
      <TranslateX1>
        <Divider className="divider-1" mb={20} />
      </TranslateX1>
      <Box
        display={"flex"}
        flexDir={window.innerWidth >= 1280 ? "row" : "column"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        mb={40}
      >
        <TranslateX21TBlockchainImage>
          <Image
            className="w-full"
            src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/blcokchain-image_kzrnx4.png"
          />
        </TranslateX21TBlockchainImage>
        <TranslateY2>
          <Center height={window.innerWidth >= 1280 ? 450 : 10}>
            <Divider
              orientation={
                window.innerWidth >= 1280 ? "vertical" : "horizontal"
              }
            />
          </Center>
        </TranslateY2>

        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"start"}
          w={window.innerWidth >= 1280 ? "33%" : "80%"}
        >
          <TranslateX1>
            <Text fontSize={64}>What is Blockchain</Text>
          </TranslateX1>
          <TranslateX2>
            <Divider />
          </TranslateX2>
          <TranslateY12>
            <Text fontSize={24} whiteSpace={"break-spaces"}>
              Blockchain is a decentralized and trustless system. All
              transactions will be stored on blockchain permanently, so now that
              this sysem is applying many fields. There is many opportunities to
              apply this technology. Bitcoin, NFT and DAO are based on this
              sysem.
            </Text>
          </TranslateY12>
        </Box>
      </Box>
      <Box
        w={"80%"}
        alignContent={"start"}
        display={"flex"}
        flexDir={window.innerWidth >= 1280 ? "row" : "column"}
        alignItems={"center"}
        justifyContent={"start"}
        mb={40}
      >
        <Box
          w={window.innerWidth >= 1280 ? "40%" : "100%"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"start"}
        >
          <TranslateX2>
            <Text fontSize={64} mb={3}>
              What is NFT
            </Text>
          </TranslateX2>
          <TranslateX1>
            <Divider />
          </TranslateX1>
          <TranslateY12>
            <Text fontSize={24} whiteSpace={"break-spaces"}>
              NFT is non fungible token. This token is used to prove the item`s
              ownership. Mainly this technology is used on degital arts, but now
              that this feature is applied on many fields.{" "}
            </Text>
          </TranslateY12>
        </Box>
        <TranslateY1>
          <Center p={10} height={window.innerWidth >= 1280 ? 400 : 10}>
            <Divider
              orientation={
                window.innerWidth >= 1280 ? "vertical" : "horizontal"
              }
            />
          </Center>
        </TranslateY1>
        <TranslateX21TNFTImage>
          <Image
            w={"100%"}
            src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356037/VisionSwipe/service/nft_xyvhcc.png"
          />
        </TranslateX21TNFTImage>
      </Box>
      <TranslateX22>
        <Divider />
      </TranslateX22>
      <Container
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        maxW={"xl"}
      >
        <TranslateY1>
          <Text my={10} fontSize={64}>
            Our service
          </Text>
        </TranslateY1>
        {window.innerWidth >= 1280 ? (
          <Box
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <TranslateX21TBlockchainIconImage>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/blockchainIcon_injapn.png"
              />
            </TranslateX21TBlockchainIconImage>
            <TranslateX21TCryptoIconImage>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/cryptoIcon_jz8ha1.png"
              />
            </TranslateX21TCryptoIconImage>
            <TranslateX21TNFTIconImage>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/nftIcon_btjxag.png"
              />
            </TranslateX21TNFTIconImage>
          </Box>
        ) : (
          <Box
            display={"flex"}
            flexDir={"row"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <TranslateX21TBlockchainIconImage2>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/blockchainIcon_injapn.png"
              />
            </TranslateX21TBlockchainIconImage2>
            <TranslateX21TCryptoIconImage>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/cryptoIcon_jz8ha1.png"
              />
            </TranslateX21TCryptoIconImage>
            <TranslateX21TNFTIconImage2>
              <Image
                w={"100%"}
                src="https://res.cloudinary.com/dbfpsigax/image/upload/v1668356012/VisionSwipe/service/nftIcon_btjxag.png"
              />
            </TranslateX21TNFTIconImage2>
          </Box>
        )}

        {window.innerWidth >= 1280 ? (
          <>
            <TranslateX2>
              <Text my={10} fontSize={24} whiteSpace={"break-spaces"}>
                We will apply blockchain technology to your business field. For
                example, we will create a system to store all datas of your
                contract or transactons with customers on blockchain, make a
                system to enable customers to pay with cryptocurrency.{" "}
              </Text>
            </TranslateX2>
            <TranslateX1>
              <Text fontSize={24}>
                If you have some questions, feel free to contact us. We would
                love to help your business and success.
              </Text>
            </TranslateX1>
          </>
        ) : (
          <>
            <TranslateX22>
              <Text my={10} fontSize={24} whiteSpace={"break-spaces"}>
                We will apply blockchain technology to your business field. For
                example, we will create a system to store all datas of your
                contract or transactons with customers on blockchain, make a
                system to enable customers to pay with cryptocurrency.{" "}
              </Text>
            </TranslateX22>
            <TranslateX11>
              <Text fontSize={24}>
                If you have some questions, feel free to contact us. We would
                love to help your business and success.
              </Text>
            </TranslateX11>
          </>
        )}
      </Container>
    </Box>
  );
};
