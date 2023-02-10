import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import MapContainer from '../../../Map/components/containers/map_container';
import "../styles/text.css"


function MapPage(props) {
  const [map, setMap] = useState(true)
  const location = useLocation()
  if (location.state) {
    console.log(location.state)

    return (
      <>
        <h2 className='overlayBox'><span className='overlayTitle'>Currently in {location.state.cityName}, {location.state.stateName} looking for: {location.state.type == "fun" ? "Activity" : location.state.type}</span></h2>
        <MapContainer className="Map" lat={location.state.lat} lng={location.state.lng} status={map} type={location.state.type} zoom={13} />
      </>
    );
  }
  return (
    <p>
    </p>
  )


}

export default MapPage;