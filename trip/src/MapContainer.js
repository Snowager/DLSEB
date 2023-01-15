import React, {useState, useEffect, useRef} from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = () => {

    const [ selected, setSelected ] = useState({});
  
    const onSelect = item => {
    setSelected(item);
  }
  
  //map needs constraints in order to show up
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  //coordinates of the center of the map
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }

  //list of locations used for testing the google markers and infoWindows
  const locations = [
    {
      name: "Location 1",
      desc: "Something cool",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      name: "Location 2",
      desc: "Something fresh",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      name: "Location 3",
      desc: "Something wild",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      name: "Location 4",
      desc: "Something frisky",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      name: "Location 5",
      desc: "Something damn right awesome",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
];
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyCbEViNtWBZefKVLluU-rWvH4fVKYz5Uuk'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={defaultCenter}>
            {
                locations.map(item => {
                    return (
                        <Marker key={item.name}
                        position={item.location}
                        onClick={() => onSelect(item)}
                        />
                    )
                })
            }
            {
                selected.location &&
                (
                    <InfoWindow
                    position={selected.location}
                    clickable={true}
                    onCloseClick={() => setSelected({})}
                    >
                        {/*commenting in jsx is dumb*/}
                        <p>
                            <h1>hi</h1>
                            <h1>bye</h1>
                        </p>
                        </InfoWindow>
                )
            }
            </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;