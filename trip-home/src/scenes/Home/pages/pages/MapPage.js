import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../MapCole/components/containers/MapContainer';


function MapPage() {
  const [map] = useState(true)
  const location = useLocation()
  if (location.state) {
    console.log(location.state)

    return (
      <>
        <h2>{location.state.lat}, nate WHO? {location.state.lng}</h2>
        <MapContainer className="Map" lat={location.state.lat} lng={location.state.lng} status={map} zoom={10} />
      </>
    );
  }
  return (
    <p>
    </p>
  )


}

export default MapPage;