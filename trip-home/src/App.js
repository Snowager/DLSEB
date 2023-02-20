import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SplashPage from './scenes/Home/pages/pages/splash_page';
import MapPage from './scenes/Home/pages/pages/map_page';
import About from './scenes/About/pages/pages/about';
import Login from './scenes/Sign/pages/pages/login'; //login//
import Register from './scenes/Sign/pages/pages/register.js';
//import Reset from './scenes/Sign/pages/pages/reset';
import Dashboard from './scenes/Sign/pages/pages/dashboard.js';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
        <Route exact path='/' element={< SplashPage />} />
          <Route exact path="/about" element={<About />} />
          {<Route exact path="/login" element={<Login />} />}
          <Route exact path="/register" element={<Register />} />*/
          {/*<Route exact path="/reset" element={<Reset />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
            <Route path="/MapPage/*"  element={<MapPage />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;