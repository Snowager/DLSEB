import React, { useState, useEffect, useRef } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import StarRatings from 'react-star-ratings';
import "../styles/map.css"

// passes props to the map container
const MapContainer = (props) => {

  // these are our constant variables, anything using const [foo, bar] is a get/set essentially
  const google = window.google;
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  const places = [];

  //coordinates of the center of the map
  const defaultCenter = {
    lat: props.lat, lng: props.lng
  };

  //map needs constraints in order to show up
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };



  // React callback to load map
  const onLoad = React.useCallback(
    function onLoad(map) {
      const service = new google.maps.places.PlacesService(map)
      var request = {
        location: map.center,
        radius: "5",
        query: props.type
      };
      // -places- text search returns locations that fit the partial search provided with props.type
      service.textSearch(request, callback);
      function callback(results, status) {
        // only pushes results if it gets an OK status
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            console.log(results[0])
            var price = ""
            for (var j = 0; j < results[i].price_level; j++) {
              price += "$"
            }
            results[i].priceString = price;
            places.push(results[i])
          }
          console.log(places.length)
          setMarkers(places)
        }
        // --TODO-- add "else" block for a failed status return
      }
    }
  )

  // container for the map

  // lines underneath are options
  const map = <GoogleMap
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={defaultCenter}
    onLoad={onLoad}>

    <div id="root1"></div>
    {console.log("updated")}


    {/* brackets let us use javascript inline */}
    
    
    {/* this format (item + && + (functional output)) checks for places being not null, before trying to map the markers in our array*/}
    {
      places &&
      (
        ({/* Marker options. Needs a key and position to display on map. position is lat/lng coords */}),
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

    {/*another conditional function for the infoWindow. Checks for marker existence to display, closes by changing the selected object back to null*/}
    {selected ? (<InfoWindow
      position={selected.geometry.location}
      onCloseClick={() => {
        setSelected(null)
      }}>
        {/* infoWindow can have one child div. Can still include other components inside the window via nesting and flex arrangement*/}
      <div>
        <div className='photoContainer card'>
          <img src={selected.photos[0].getUrl()}></img>
          <div className="starContainer"><div className='star'><StarRatings
            rating={selected.rating}
            starRatedColor="purple"
            starDimension="20px"
            starSpacing="8px"
          />
          </div>
            <span className="rating" style={{ color: "blue" }}>{selected.rating}
            </span>
          </div>
          <p>ratings total: ({selected.user_ratings_total})</p>
          <h4>
            {selected.name} {selected.priceString? "("+selected.priceString+")": ""}
          </h4>
          <p>
            {selected.formatted_address}
          </p>
          <button
            onClick={() => {
              setTrip([...trip, selected])
            }}>
            Add to trip
          </button>
        </div>
      </div>
    </InfoWindow>) : null}
  </GoogleMap>

  // only displays map if true is returned
  if (props.status) {
    return (
      <>
        {map}
        {/* conditional function to display mapped divs only if the "trip" array is not empty */}
        {/* This returns our list --TODO-- add overlay div (z-index, position: absolute in css) */}
        {trip && (
          trip.map(tripNodes => (
            <div style={{ color: 'white' }}>
              <h1>
                {tripNodes.name.length > 12 ? (tripNodes.name.substr(0, 20) + "...") : tripNodes.name}
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