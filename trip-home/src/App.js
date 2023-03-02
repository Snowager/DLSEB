import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SplashPage from './scenes/Home/pages/pages/splash_page';
import MapPage from './scenes/Home/pages/pages/map_page';
import About from './scenes/About/pages/pages/about';
import LoginPage from './scenes/Splash/components/fragments/login_page';
import RegisterPage from './scenes/Splash/components/fragments/register_page';
import Reset from './scenes/Sign/pages/pages/reset';
import Dashboard from './scenes/Sign/pages/pages/profile.js';

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
          <Route exact path="/profile" element={<Dashboard />} />
          <Route path="/MapPage/*" element={<MapPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;