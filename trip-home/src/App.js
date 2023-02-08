import React from 'react';
//import Navbar from './scenes/Splash/components/fragments/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import SplashPage from './scenes/Home/pages/pages/SplashPage';

import About from './scenes/About/pages/pages/About';
import Login from './scenes/Sign/pages/pages/Login'; //login//
import Register from './scenes/Sign/pages/pages/Register';
import Reset from './scenes/Sign/pages/pages/Reset';
import Dashboard from './scenes/Sign/pages/pages/Dashboard';
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {<Route exact path="/reset" element={<Reset />} /> }
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;