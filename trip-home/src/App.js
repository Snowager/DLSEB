import React from 'react';
import Navbar from './scenes/Splash/components/fragments/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './scenes/Splash/pages/Home';
import LoginPage from './scenes/Sign/pages/pages/LoginPage';


function App() {
  return (
  <>
      <Router> 
        <Navbar />  
          <Routes>
            <Route exact path='/' element={< Home />} />
            <Route exact path='/Sign' element={<LoginPage />} />
          </Routes>
      </Router>
      </>
  );
}
export default App;
