import visionSwipe from '../assets/vision-swipe.png'
import buyIcon from '../assets/BuyIcon.png'
import rentIcon from "../assets/RentIcon.png"
import bookIcon from "../assets/BookIcon.png"
import blockchainIcon from "../assets/blockchainIcon.png"
import nftIcon from "../assets/nftIcon.png"
import bitcoinIcon from "../assets/cryptoIcon.png"
import {FadeIn} from "../animations/FadeIn"


export const Landing = ()=>{
  
    return(
        <body className="w-full items-center">
        <header className="header-home flex flex-row justify-between">
          <img src={visionSwipe} className="m-5 ml-10 object-contain w-80 h-14 fadeIn"/>
          <div className="flex flex-col items-center self-center mr-32 fadeIn">
          <p className="text-7xl">Realize</p>
          <p className="text-7xl">the new world</p>
          <p className="text-xl mt-5">Trading building NFT</p>
          </div>
          
        </header>
        <section className="flex flex-col items-center">
            <a href='/kakurega' className='cursor-pointer'>
          <div className="building-section mt-20 flex flex-row">
            <p className='text-7xl m-10 z-1'>Buildings</p>
            <FadeIn>
            <div className="w-full grid grid-row-3 grid-col-5 gap-0">
                <img className="row-start-1 row-end-2 col-start-6 col-end-7 object-contain hover:opacity-40 cursor-pointer" src={buyIcon}/>
                <img className="row-start-2 row-end-3 col-start-5 col-end-6 object-contain hover:opacity-40 cursor-pointer" src={rentIcon}/>
                <img className="row-start-3 row-end-4 col-start-4 col-end-5 object-contain hover:opacity-40 cursor-pointer" src={bookIcon}/>
            </div>
            </FadeIn>
          </div>
          </a>
          <div className="service-section mt-20 flex flex-row">
            <p className="text-7xl m-10 z-1">Services</p>
            <FadeIn>
            <div className="w-full grid grid-row-3 grid-col-5 gap-0">
            <img className='row-start-1 row-end-2 col-start-4 col-end-5 object-contain opacity-0' src={blockchainIcon}/>
                <img className='row-start-2 row-end-3 col-start-4 col-end-5 object-contain hover:opacity-40' src={blockchainIcon}/>
                <img className='row-start-2 row-end-3 col-start-6 col-end-7 object-contain hover:opacity-40' src={nftIcon}/>
                <img className='row-start-3 row-end-4 col-start-5 col-end-6 object-contain hover:opacity-40' src={bitcoinIcon}/>
            </div>
            </FadeIn>
          </div>
          <FadeIn>
          <div className="w-4/5 h-auto flex flex-row justify-between mt-20">
           <a href="#" className='hover:opacity-40 cursor-pointer mr-5'>
            <div className="aboutus-section  ">
              <p className="text-5xl m-2">About us</p>
            </div>
            </a>
            <a href="#" className='hover:opacity-40 cursor-pointer ml-5'>
            <div className="contact-section">
              <p className="text-5xl m-2">Contact</p>
            </div>
            </a>
          </div>
          </FadeIn>
        </section>
        <footer className="mt-20 main-footer">
        
      </footer>
      </body>
    )
}
