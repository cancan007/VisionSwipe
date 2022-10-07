import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import { Landing } from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BuildingDetail } from './pages/BuildingDetail';
import { Buildings } from './pages/Buildings';
import { Contact } from './pages/Contact';
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { KakuregaAdmin } from './pages/KakuregaAdmin';

function App() {
  const PUBLIC_KEY : any = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
    const stripePromise = loadStripe(PUBLIC_KEY);


  return (
    <div>
      <head>
        <title>Vision Swipe</title>
      </head>
      <Elements stripe={stripePromise}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/buildings" element={<Buildings/>}/>
        <Route path="/kakurega" element={<BuildingDetail/>}/>
        <Route path="/kakurega/admin" element={<KakuregaAdmin/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
      </BrowserRouter>
      </Elements>
    </div>
  );
}

export default App;
