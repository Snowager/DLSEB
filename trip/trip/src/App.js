
import './App.css';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, {useState, useEffect, useRef} from 'react';
import MapContainer from './MapContainer.js'; 
import SearchBar from './components/searchBar.js';
/*global google*/

function App() {

  return (
    <>
    <div className='App'>
      <SearchBar/>
      <MapContainer/>
      </div>
                        
      <script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly"
      defer
      ></script>
      </>
  );
}

export default App;
