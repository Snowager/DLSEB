import React from 'react';
import Navbar from './scenes/Splash/components/fragments/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./scenes/Sign/pages/pages/LoginPage"
import SplashPage from './scenes/Home/pages/pages/SplashPage';
import MapPage from './scenes/Home/pages/pages/MapPage';

function Home() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={< SplashPage />} />
          <Route exact path='/SignIn' element={<LoginPage />} />
          <Route path="/MapPage/*" element={<MapPage />} />
        </Routes>
      </Router>
    </>
  );
}
export default Home;


