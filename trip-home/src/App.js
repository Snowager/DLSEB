import React from 'react';
import Navbar from './scenes/Splash/components/fragments/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from "./scenes/Sign/pages/pages/LoginPage"
import SplashPage from './scenes/Home/pages/pages/SplashPage';

function App() {
  return (
  <>
      <Router> 
        <Navbar />  
          <Routes>
            <Route exact path='/' element={< SplashPage />} />
            <Route exact path='/SignIn' element={<LoginPage />} />
          </Routes>
      </Router>
      </>
  );
}
export default App;
