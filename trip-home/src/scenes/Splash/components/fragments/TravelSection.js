import React, { Component } from 'react';
import '../styles/TravelSection.css';
import MapSearchBar from '../../../Home/components/fragments/MapSearchBar';
import MapPage from '../../../Home/pages/pages/MapPage';
import Button from './Button';
import { Link } from 'react-router-dom';



const TravelSection = (props) => {

  return (
    <div className='travel-continer'>
      <MapSearchBar> </MapSearchBar>
      <MapPage></MapPage>
    </div>
  )
}

export default TravelSection