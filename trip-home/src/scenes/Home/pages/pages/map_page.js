/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../Map/components/containers/map_container';
import Navbar from '../../../Splash/components/fragments/navbar_map.js';
import "../styles/text.css"


function MapPage(props) {
  const [map, setMap] = useState(true)
  const location = useLocation()
  if (location.state) {
    console.log(location.state)

    return (
      <>
        <Navbar />
        <h2 className='overlayBox'><span className='overlayTitle'>Currently in {location.state.cityName}, {location.state.stateName} looking for: {location.state.type === "fun" ? "Activity" : location.state.type}</span></h2>
        <MapContainer className="Map" lat={location.state.lat} lng={location.state.lng} city={location.state.cityName} status={map} type={location.state.type} zoom={13} id={1}/>
      </>
    );
  }
  return (
    <p>
    </p>
  )


}

export default MapPage;