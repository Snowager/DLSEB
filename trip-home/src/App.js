import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SplashPage from './scenes/Home/pages/pages/splash_page';
import MapPage from './scenes/Home/pages/pages/map_page';
import About from './scenes/About/pages/pages/about';
import LoginPage from './scenes/Splash/components/fragments/login_page';
import RegisterPage from './scenes/Splash/components/fragments/register_page';
import Reset from './scenes/Sign/pages/pages/reset';
import Profile from './scenes/Sign/pages/pages/profile';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path='/' element={< SplashPage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/reset" element={<Reset />} /> 
          <Route exact path="/profile" element={<Profile />} />
          <Route path="/MapPage/*" element={<MapPage />} />
          <Route path="/Package/dinner_movie/*" element={<MapPage package={"dinner_movie"}/>} />
          <Route path="/Package/family/*" element={<MapPage package={"family"}/>} />
          <Route path="/Package/weekend_vacation/*" element={<MapPage package={"weekend_vacation"}/>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;