import React from 'react';
import './App.css';
import Navbar from "./Navbar";
import {About} from "./About";

function App() {
  
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="App">
        <About />
      </div>
    </>
  );
}

export default App;