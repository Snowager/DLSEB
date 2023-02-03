import React, {Component}from 'react';
import'../styles/TravelSection.css';
import SearchBar from '../../../MapCole/components/fragments/searchBar';
import MapPage from '../../../Home/pages/pages/MapPage';
import Button from './Button';
import { Link } from 'react-router-dom';



const TravelSection = (props) => {

  return (
    <div className='travel-continer'>
        <SearchBar> </SearchBar>
        <MapPage></MapPage>
    </div>
  )
}

export default TravelSection