import React from 'react';
import Navbar from './scenes/Splash/components/fragments/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import Home from './scenes/Splash/pages/pages/Home.js';
import Default from './scenes/TestingDatabase/pages/default.js';

function App() {
  return (
  <>
      <Router> 
        <Navbar />  
          <Routes>
            <Route exact path='/' element={<Default />} />
          </Routes>
      </Router>
      </>
  );
}
export default App;
