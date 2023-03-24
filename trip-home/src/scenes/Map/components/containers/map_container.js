import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css"
import Save_trip_button from '../fragments/save_trip_button.js';
import "../styles/map.css"
import TodoList from "../fragments/todoList"
import ChoiceModal from '../fragments/choiceModal';
import MarkerInterface from '../fragments/markerInterface';
import TodoForm from '../fragments/todoForm';

/*

The map container is a container-type file that holds all the different components that interact with the map (Markers, 
  API services, Popup windows, Trip information)

it loads the places Service in an onload callback function (only renders once on initial map load)

The map is rendered with an initial set of height/width constraints (necessary to display)

Passed initial lat/long for centering, and query type to use as argument parameters
*/

const MapContainer = (props) => {
  const google = window.google;
  const [currMap, setMap] = useState({})
  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
  const [mapStyles, setMapStyles] = useState({
    height: "100vh",
    width: "100%"
  })
  const [query, setQuery] = useState(props.type)
  // use ref allows us to maintain state even when in a function's scope
  const service = useRef(null)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  // const [photo, setPhoto] = useState(null);
  const places = [];
  const [todos, setTodos] = React.useState([]);

  const handleClose = () => setOpen(false);

  // React callback to load map
  const onLoad = React.useCallback(
    function onLoad(map) {
      // request is an object with a center, radius for search, and initial query for getting search results
      var request = {
        location: center,
        radius: "5",
        query: query
      };
      // initialize our service's current state to reuse later (place service)
      service.current = new google.maps.places.PlacesService(map)
      service.current.textSearch(request, callback);
      function callback(results, status) {
        // only pushes results if it gets an OK status
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // 
          for (var i = 0; i < results.length; i++) {
            setPrices(results[i])
            places.push(results[i])
          }
          setMarkers(places)
        }
        // --TODO-- add "else" block for a failed status return






        let infoWindow = new google.maps.InfoWindow({
          content: "Click the map to get Lat/Lng!",
          position: center,
        });

        infoWindow.open(map);
        // [START maps_event_click_latlng_listener]
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();
          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });

          document.getElementById('lat').value = mapsMouseEvent.latLng.lat();
          document.getElementById('lng').value = mapsMouseEvent.latLng.lng();

          infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          );
          infoWindow.open(map);







          var geocoder = new google.maps.Geocoder();             // create a geocoder object
          var location = new google.maps.LatLng(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng());    // turn coordinates into an object          
          geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {           // if geocode success
              var address = results[0].formatted_address;         // if address found, pass to processing function
              console.log(address);
            }
          });

          // const Geocode = new google.maps.Geocoder();

          // const input = (mapsMouseEvent.latLng.lat).value;
          // const latlngStr = input.split("{ ", "lat:", 2);
          // const latlng = {
          //   lat: parseFloat(latlngStr[0]),
          //   lng: parseFloat(latlngStr[1]),
          // };
          // Geocode.fromLatLng({ location: latlng }).then(
          //   response => {
          //     const address = response.results[0].formatted_address;
          //     console.log(address);
          //   },
          //   error => {
          //     console.error(error);
          //   }
          // );

        });









      }
    }, [center]
  )

  // Set a price value for generated locations with price data
  const setPrices = (results) => {
    var price = ""
    for (var j = 0; j < results.price_level; j++) {
      price += "$"
    }
    results.priceString = price;
  }

  // call this to modify markers properly (query - tag to search for, center - where to center the search)
  const modifyMarkers = (query, center) => {
    setCenter(selected.geometry.location)
    setSelected(null)
    setMarkers([])
    handleClose()
    changeMarker(query, center)
  }

  // reusable helper service function to modify marker positions
  const changeMarker = (query, center) => {
    var request = {
      location: center,
      radius: "5",
      query: query
    };
    service.current.textSearch(request, callback);
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          setPrices(results[i])
          places.push(results[i])
        }
        setMarkers(places)
      }
    }
  }

  // map object
  const map = <GoogleMap
    // create map reference
    ref={(map) => setMap(map)}
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={center}
    onLoad={onLoad}
  >
    {/* MarkerInterface component handles the markers and marker infoWindows on the map  */}
    <MarkerInterface
      places={places}
      markers={markers}
      selected={selected}
      setSelected={setSelected}
      setOpen={setOpen}
      open={open}
      todos={todos}
      setTodos={setTodos}
      google={google}
    />
  </GoogleMap>

  if (props.status) {

    return (
      <>
        <div className='mapContainer'>
          {/* TodoList handles the list of Todo trip items */}
          <TodoList
            todos={todos}
            setTodos={setTodos}
          />
          {/* passes the state of our todo list into component as function to be modified and passed back up */}
          <TodoForm
            todos={todos}
            setTodos={setTodos}
          />
          {map}
          {/* ChoiceModal is the modal for making a new trip choice */}
          {/* only opens if marker added to trip (tracked using open bool)*/}
          {open ? <ChoiceModal
            selected={selected}
            open={open}
            handleClose={handleClose}
            modifyMarkers={modifyMarkers}
          /> : null}
        </div>
        <Save_trip_button id={props.id} trip={trip} city={props.city} />


        <input type="text" name="lat" id="lat" />

        <input type="text" name="lng" id="lng" />
      </>
    )
  }
  return null
}

export default MapContainer;