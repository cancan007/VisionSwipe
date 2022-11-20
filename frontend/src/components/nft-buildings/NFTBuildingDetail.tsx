import "../../detail.css";
import { FadeIn } from "../../animations/FadeIn";
import { FetchItemResult } from "../../hooks/api/nft-buildings/useFetchItems";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, Text, useDisclosure } from "@chakra-ui/react";
import { convertToAvax, formEth } from "../../utils/general";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useAppSelector } from "../../hooks/useGeneral";
import { BigNumber } from "ethers";
import { useCreateMarketSale } from "../../hooks/api/nft-buildings/useCreateMarketSale";
import {
  addCommissionToPrice,
  addCommissionToPrice2,
} from "../../utils/nft-buildings/general";
import { EmailFormModal } from "./EmailFormModal";
import emailjs from "emailjs-com";
import { serviceEmailId, userEmailId } from "../../utils/constants";
import { nftBuildingTempEmailId } from "../../utils/nft-buildings/constants";

export interface Customer {
  name: string;
  email: string;
  contact: string;
  country: string;
  message: string;
}

export const NFTBuildingDetailModal = memo(
  (item: FetchItemResult & { setItemInfo: any }) => {
    const market = useAppSelector((state) => state.market.contract);
    const provider = useAppSelector((state) => state.provider.connection);
    const [formedAVAX, setFormedAvax] = useState<BigNumber>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const customerRef = useRef(null);
    const { data: gettingCreateSaleTx, mutate: mutateCreateMarketSale } =
      useCreateMarketSale({
        onSuccess: (res) => {
          if (
            serviceEmailId &&
            nftBuildingTempEmailId &&
            userEmailId &&
            customerRef.current
          ) {
            emailjs
              .sendForm(
                serviceEmailId,
                nftBuildingTempEmailId,
                customerRef.current,
                userEmailId
              )
              .then(() => onClose());
          }
          alert("Succeeded to buy the building NFT");
          item.setItemInfo(undefined);
          window.location.reload();
        },
        onError: (err) => {
          alert(err);
        },
      });

    const handleBuy = () => {
      if (!formedAVAX) return;
      if (!customerRef.current) {
        alert("You have to register your information.");
        return;
      }
      mutateCreateMarketSale({
        market,
        provider,
        item,
        value: addCommissionToPrice2(formedAVAX),
      });
    };

    const scrollElement: any = useRef(null);

    const scrollLeft = () => {
      scrollElement.current.scrollLeft -= scrollElement.current.offsetWidth;
    };
    const scrollRight = () => {
      scrollElement.current.scrollLeft += scrollElement.current.offsetWidth;
    };

    useEffect(() => {
      convertToAvax(market, item.priceUnit, item.price).then((res) => {
        setFormedAvax(res);
      });
    }, [market, item.price, item.priceUnit]);

    return (
      <>
        <Box className="flex flex-col items-center w-full overflow-y-auto scroll-smooth">
          <Box className="fixed top-[10vh] bg-white bg-opacity-75 rounded-lg">
            <Box className={"w-full flex flex-row justify-end"}>
              <IconContext.Provider
                value={{ className: "mt-3 mr-3", size: "2em" }}
              >
                <AiOutlineCloseCircle
                  onClick={() => item.setItemInfo(undefined)}
                />
              </IconContext.Provider>
            </Box>
            <section className="flex flex-col items-center ">
              <FadeIn>
                <div className="flex flex-col items-center md:flex-row md:justify-center w-full mt-2">
                  <div className=" flex flex-row items-center w-full md:w-1/2 h-auto px-1 ">
                    <button
                      onClick={() => scrollLeft()}
                      className="h-0 w-0 border-y-8 border-y-transparent border-r-[16px] border-r-gray-600 hover:border-r-gray-300"
                    ></button>
                    <div
                      ref={scrollElement}
                      id="slider"
                      className="flex flex-row  mb-0  md:mx-1 overflow-x-scroll scroll-smooth"
                    >
                      {item.images
                        ? item.images.map((image: string, i: number) => {
                            return (
                              <img
                                className="object-contain max-h-[250px] md:max-h-[500px]"
                                src={image}
                              />
                            );
                          })
                        : item.image && (
                            <img
                              className="object-contain max-h-[250px] md:max-h-[500px]"
                              src={item.image}
                            />
                          )}
                    </div>
                    <button
                      onClick={() => scrollRight()}
                      className="h-0 w-0 border-y-8 border-y-transparent border-l-[16px] border-l-gray-600 hover:border-l-gray-300"
                    ></button>
                  </div>
                  <div className="building-info-section flex flex-col items-start justify-center w-4/5 md:w-1/2 p-1 md:ml-10">
                    <p className="mt-1 md:mt-5 text-2xl">
                      Building name: {item.name}
                    </p>
                    <Text>Company: {item.company}</Text>
                    <p>Address: {item.address}</p>
                    <Text>Building Type: {item.buildingType}</Text>
                    <Text>Sale Type: {item.saleType}</Text>
                    <Text>
                      Price: {formEth(item.price)}
                      {Number(formEth(item.priceUnit)) === 0 ? "$" : "Yen"}
                    </Text>
                    <Text>
                      Price in AVAX:{" "}
                      {formedAVAX
                        ? Math.round(Number(formEth(formedAVAX)) * 1000) / 1000
                        : null}
                      AVAX
                    </Text>
                    <Text className="text-xs">
                      *Commission fee is 1% of the price
                    </Text>
                    <Text>Description: {item.description}</Text>
                    <Button
                      onClick={
                        formedAVAX
                          ? () => {
                              onOpen();
                              //mutateCreateMarketSale({market,provider, item, value:addCommissionToPrice(formedAVAX, 2)})
                            }
                          : () => {}
                      }
                      colorScheme={"blue"}
                      variant={"outline"}
                    >
                      Buy
                    </Button>
                  </div>
                </div>
              </FadeIn>
            </section>
          </Box>
        </Box>
        <EmailFormModal
          isOpen={isOpen}
          onClose={onClose}
          customerRef={customerRef}
          handleBuy={handleBuy}
          itemId={item.itemId}
        />
      </>
    );
  }
);
