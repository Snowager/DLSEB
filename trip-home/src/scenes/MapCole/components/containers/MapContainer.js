import React, { useState, useEffect, useRef } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapContainer = (props) => {

  const google = window.google;
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  const places = []

  const onLoad = React.useCallback(
    function onLoad(map) {
      const service = new google.maps.places.PlacesService(map)
      var request = {
        location: map.center,
        radius: "5",
        query: "restaurant"
      };
      service.textSearch(request, callback);
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            console.log(results[i])
            places.push(results[i])
          }
          console.log(places.length)
          setMarkers(places)
        }
      }
    }
  )

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

  const map = <GoogleMap
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={defaultCenter}
    onLoad={onLoad}
  >

    <div id="root1"></div>
    {console.log("updated")}

    {
      places &&
      (
        markers.map(places => (
          <Marker
            key={places.place_id}
            position={places.geometry.location}
            onClick={() => {
              setSelected(places)
            }} />
        )
        )
      )
    }
    {selected? (<InfoWindow
    position={selected.geometry.location}
    onCloseClick={() => {
      setSelected(null)
    }}>
      <div>
        <h1>
          {selected.name}
        </h1>
        <p>
          Business is: {selected.business_status}
        </p>
        <button
        onClick={() => {
          setTrip([...trip, selected])
        }}>
          Add to trip
        </button>

      </div>
    </InfoWindow>): null}
  </GoogleMap>

  if (props.status) {
    return (
      <>
        {map}
        {trip && (
          trip.map(tripNodes => (
            console.log(tripNodes.geometry.location),
            <div style={{color:'white'}}>
              <h1>
                {tripNodes.name}
              </h1>
              <p>lat:{tripNodes.geometry.location.lat()}</p>
            </div>
          ))
        )}
      </>
    )
  }
  return null
}

export default MapContainer;