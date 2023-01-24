import React from 'react';
import Navbar from './scenes/Splash/components/fragments/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './scenes/Splash/pages/Home';

function App() {
  return (
  <>
      <Router> 
        <Navbar />  
          <Routes>
            <Route exact path='/' element={< Home />} />
          </Routes>
      </Router>
      </>
  );
}
export default App;
