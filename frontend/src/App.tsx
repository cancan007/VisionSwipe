import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import visionSwipe from './assets/vision-swipe.png'
function App() {
  return (
    <div>
      <head>
        <title>Vision Swipe</title>
      </head>
      <body>
        <header className="header-home flex flex-row justify-between">
          <img src={visionSwipe} className="m-5 ml-10 object-contain w-80 h-14"/>
          <div className="flex flex-col items-center self-center mr-32">
          <p className="text-7xl">Realize</p>
          <p className="text-7xl">the new world</p>
          <p className="text-xl mt-5">Trading building NFT</p>
          </div>
          
        </header>
        <section className="flex-col items-center">
          <div className="building-section">

          </div>
        </section>
      </body>
    </div>
  );
}

export default App;
