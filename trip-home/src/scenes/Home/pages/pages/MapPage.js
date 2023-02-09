import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../MapCole/components/containers/MapContainer';


function MapPage(props) {
  const [map, setMap] = useState(true)
  const location = useLocation()
  if (location.state) {
    console.log(location.state)

    return (
      <>
        <h2>Currently in {location.state.cityName}, {location.state.stateName} looking for: {location.state.type}</h2>
        <MapContainer className="Map" lat={location.state.lat} lng={location.state.lng} status={map} type={location.state.type} zoom={10} />
      </>
    );
  }
  return (
    <p>
    </p>
  )


}

export default MapPage;