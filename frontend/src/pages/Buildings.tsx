import "../buildings.css";
import visionSwipe from "../assets/vision-swipe.png";
import kakurega from "../assets/kakurega.png";
import { FadeIn } from "../animations/FadeIn";
import {
  FetchItemResult,
  useFetchItems,
} from "../hooks/api/nft-buildings/useFetchItems";
import { useDisclosure } from "@chakra-ui/react";
import { ConnectToMetamask } from "../components/nft-buildings/ConnectToMetamask";

export const Buildings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const networkHandler = async () => {
    await window.ethereum
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: /*"0xa869"*/ "0x5" }],
      })
      .then(() => (window.location.href = "/nft-buildings"));
  };
  return (
    <body>
      <header className="flex flex-col text-white">
        <div className="buildings-background-image flex flex-row justify-between">
          <p className="text-5xl pt-5 pl-10 fadeIn">Buildings</p>
          <div className="flex flex-row items-center mr-10 gap-x-4">
            <p
              onClick={() => onOpen()}
              className="text-xl hover:text-blue-300 focused:text-blue-500"
            >
              NFT buildings
            </p>

            <a href="/">
              <p className="text-xl hover:text-blue-300 focused:text-blue-500">
                Home
              </p>
            </a>
          </div>
        </div>
        <div className="bg-black w-full flex flex-col items-center py-2">
          <img className="fadeIn h-[50px] w-auto mb-2" src={visionSwipe} />
          <div className="flex flex-col md:flex-row items-center w-4/5">
            <input
              className="bg-gray-50 border outline-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              placeholder="Search from buiding name"
            />
            <div className="flex flex-row">
              <select className="ml-5 block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option hidden>Select building type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Hotel</option>
                <option>Builidng</option>
              </select>
              <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" hidden>
                  Select contact type
                </option>
                <option value="">Buy</option>
                <option value="">Rent</option>
                <option value="">Book</option>
              </select>
              <select className="block p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="" hidden>
                  Select price range
                </option>
                <option value=""></option>
                <option value=""></option>
                <option value=""></option>
              </select>
            </div>
          </div>
          {/*<div className="flex flex-col md:flex-row items-center w-4/5 my-3">
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
                  </div>*/}
        </div>
      </header>
      <section className="flex flex-col items-center w-full mt-10">
        <div className="text-black w-3/5 flex flex-row items-end justify-end">
          <a href="" className="mr-1 hover:text-blue-300">
            1
          </a>
          <a href="" className="mr-1 hover:text-blue-300">
            2
          </a>
          <a href="" className="hover:text-blue-300">
            3
          </a>
          <p>...</p>
          <a href="" className="mx-1 hover:text-blue-300">
            8
          </a>
          <a href="" className="hover:text-blue-300">
            Next
          </a>
        </div>
        <a href="/kakurega" className="w-full px-2 md:w-3/5 h-auto">
          <div className="flex flex-row h-[144px] justify-start bg-gray-300 mt-5 rounded-lg cursor-pointer hover:opacity-50 overflow-y-auto">
            <img
              alt=""
              src={kakurega}
              className="w-1/3 h-auto object-cover rounded-l-lg"
            />
            <div className="flex flex-col items-start justify-center text-black ml-5">
              <p className="text-sm">Building name: Hotel Kakurega in Narita</p>
              <p className="text-sm">Company: Thoroughbred Inc.</p>
              <p className="text-sm">
                Address: 982-1, Saiwai-cho, Narita-shi, Chiba-ken
              </p>
              <p className="text-sm">
                Comment: Hello! In our hotel, there are hinokiburos which are
                bathtubs made of Hinoki tree in all rooms, so you can soak in
                and enjoy the good smell of nature.
              </p>
            </div>
          </div>
        </a>
      </section>
      <footer className="flex flex-row justify-center mt-10">
        <p className="text-black text-sm">
          CopyRight (C) 2022 VisionSwipe All rights reserved.
        </p>
      </footer>
      <ConnectToMetamask
        isOpen={isOpen}
        onClose={onClose}
        networkHandler={networkHandler}
      />
    </body>
  );
};
