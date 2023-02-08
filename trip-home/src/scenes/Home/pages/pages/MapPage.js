import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../MapCole/components/containers/MapContainer';


function MapPage(props) {
  const [map, setMap] = useState(true)
  const location = useLocation()
  const [city, setCity] = useState([]);
  if (location.state) {
    const center = ({ lat: parseFloat(location.state.lat), lng: parseFloat(location.state.lng) });
    console.log(location.state)

    return (
      <>
        <h2>{location.state.lat}, nate WHO? {location.state.lng}</h2>
        <MapContainer className="Map" center={center} lat={location.state.lat} lng={location.state.lng} status={map} zoom={10} />
      </>
    );
  }
  return (
    <p>
    </p>
  )


}

export default MapPage;