import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'


function MapPage(props) {
  const location = useLocation()
  const [city, setCity] = useState([]);
  if (location.state) {
    console.log(location.state)
    return (
      <>
        <h2>{location.state.city}</h2>
        {/*<MapContainer lat={lat} lng={lng} status={map} zoom={10} /> */}
      </>
  );
  }
  return (
    <p>
      loading...
    </p>
  )

  
}

export default MapPage;
