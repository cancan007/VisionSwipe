import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import visionSwipe from './assets/vision-swipe.png'
import buyIcon from './assets/BuyIcon.png'
import rentIcon from "./assets/RentIcon.png"
import bookIcon from "./assets/BookIcon.png"
import blockchainIcon from "./assets/blockchainIcon.png"
import nftIcon from "./assets/nftIcon.png"
import bitcoinIcon from "./assets/cryptoIcon.png"

function App() {
  return (
    <div>
      <head>
        <title>Vision Swipe</title>
      </head>
      <body className="w-full items-center">
        <header className="header-home flex flex-row justify-between">
          <img src={visionSwipe} className="m-5 ml-10 object-contain w-80 h-14"/>
          <div className="flex flex-col items-center self-center mr-32">
          <p className="text-7xl">Realize</p>
          <p className="text-7xl">the new world</p>
          <p className="text-xl mt-5">Trading building NFT</p>
          </div>
          
        </header>
        <section className="flex flex-col items-center">
          <div className="building-section mt-20 flex flex-row">
            <p className='text-7xl m-10 z-1'>Buildings</p>
            <div className="w-full grid grid-row-3 grid-col-5 gap-0">
                <img className="row-start-1 row-end-2 col-start-6 col-end-7 object-contain hover:opacity-40" src={buyIcon}/>
                <img className="row-start-2 row-end-3 col-start-5 col-end-6 object-contain hover:opacity-40" src={rentIcon}/>
                <img className="row-start-3 row-end-4 col-start-4 col-end-5 object-contain hover:opacity-40" src={bookIcon}/>
            </div>
          </div>
          <div className="service-section mt-20 flex flex-row">
            <p className="text-7xl m-10 z-1">Services</p>
            <div className="w-full grid grid-row-3 grid-col-5 gap-0">
            <img className='row-start-1 row-end-2 col-start-4 col-end-5 object-contain opacity-0' src={blockchainIcon}/>
                <img className='row-start-2 row-end-3 col-start-4 col-end-5 object-contain hover:opacity-40' src={blockchainIcon}/>
                <img className='row-start-2 row-end-3 col-start-6 col-end-7 object-contain hover:opacity-40' src={nftIcon}/>
                <img className='row-start-3 row-end-4 col-start-5 col-end-6 object-contain hover:opacity-40' src={bitcoinIcon}/>
            </div>
          </div>
          <div className="w-4/5 h-auto flex flex-row justify-between mt-20">
            <div className="aboutus-section">
              <p className="text-5xl m-2">About us</p>
            </div>
            <div className="contact-section">
              <p className="text-5xl m-2">Contact</p>
            </div>
          </div>
        </section>
        <footer className="mt-20 main-footer">
        
      </footer>
      </body>
      
    </div>
  );
}

export default App;
