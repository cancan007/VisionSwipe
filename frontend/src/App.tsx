import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import { Landing } from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BuildingDetail } from './pages/BuildingDetail';
import { Buildings } from './pages/Buildings';

function App() {
  return (
    <div>
      <head>
        <title>Vision Swipe</title>
      </head>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/buildings" element={<Buildings/>}/>
        <Route path="/kakurega" element={<BuildingDetail/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
