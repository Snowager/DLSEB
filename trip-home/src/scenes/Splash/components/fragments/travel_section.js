import React, { Component } from 'react';
import '../styles/travel_section.css';
import MapSearchBar from '../../../Home/components/fragments/map_search_bar';
import MapPage from '../../../Home/pages/pages/map_page';



const TravelSection = (props) => {

  return (
    <div className='travel-continer'>
      <MapSearchBar> </MapSearchBar>
      <MapPage></MapPage>
    </div>
  )
}

export default TravelSection