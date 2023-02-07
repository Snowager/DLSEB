import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../MapCole/components/containers/MapContainer';
import "../styles/MapPage.css";


function MapPage(props) {
  const [map, setMap] = useState(true)
  const location = useLocation()
  const [city, setCity] = useState([]);
  if (location.state) {
    console.log(location.state)
    
    return (
      <>
        <h2>{location.state.city}, {location.state.state_name}, looking for a {location.state.type}</h2>
        <MapContainer className="Mapp" lat={location.state.lat} lng={location.state.lng} status={map} zoom={10} />
      </>
  );
  }
  return (
    <p>
    </p>
  )

  
}

export default MapPage;
