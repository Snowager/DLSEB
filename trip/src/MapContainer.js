import React, {useState, useEffect, useRef} from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import MarkerContainer from './components/MarkerContainer.js';

const MapContainer = (props) => {

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
    lat: props.lat, lng: props.lng
  }

  //list of locations used for testing the google markers and infoWindows
  const locations = [
    {
      num: "1",
      name: "Location 1",
      desc: "Something cool",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      num: "2",
      name: "Location 2",
      desc: "Something fresh",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      num: "3",
      name: "Location 3",
      desc: "Something wild",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    },
    {
      num: "4",
      name: "Location 4",
      desc: "Something frisky",
      location: { 
        lat: 41.3797,
        lng: 2.1682
      },
    },
    {
      num: "5",
      name: "Location 5",
      desc: "Something damn right awesome",
      location: { 
        lat: 41.4055,
        lng: 2.1915
      },
    }
  ];


  let newName;
  let newPos;
  let item;
  var markerElement = <Marker key={newName} position={newPos} onClick={() => onSelect(item)} />

  function changeMarker(newMark) {
    var listItem = locations[newMark];
    var newName = listItem.name;
    var newPos = listItem.location;
    console.log("listItem = " + listItem + "newName = " + newName + "newPos = " + newPos);
    //root1.render(<Marker key={newName} position={newPos} onClick={() => onSelect(item)} />);
  }

  if (props.status) {
    return (
    <>
    <input type="text" id="myText" defaultValue="1"/>
    <button id="button" onClick={() => changeMarker(document.getElementById("myText").value)}>Try it</button>
     <LoadScript
       googleMapsApiKey='AIzaSyCbEViNtWBZefKVLluU-rWvH4fVKYz5Uuk'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={props.zoom}
          center={defaultCenter}>
            <MarkerContainer name={"center"} position = {defaultCenter} desc = {"something boring"}  />
            </GoogleMap>
     </LoadScript>
     </>
  )
          }
          return null
}

export default MapContainer;