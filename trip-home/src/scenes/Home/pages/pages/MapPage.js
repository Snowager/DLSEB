import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'


function MapPage(props) {
  const location = useLocation()
  const { type } = location.state

  return (
      <>
        <p>{type}</p>
        <h2>{location.state.cty}</h2>
        {/*<MapContainer lat={lat} lng={lng} status={map} zoom={10} /> */}
      </>
  );
}

export default MapPage;
