import React, { useState, useRef } from 'react';
import { DirectionsRenderer, GoogleMap, Marker, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css"
import Save_trip_button from '../fragments/save_trip_button.js';
import "../styles/map.css"
import TodoList from "../fragments/todoList"
import ChoiceModal from '../fragments/choiceModal';
import MarkerInterface from '../fragments/markerInterface';

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
  const route = useRef(null)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  // const [photo, setPhoto] = useState(null);
  const places = [];
  const [todos, setTodos] = useState([]);
  const [directions, setDirections] = useState({});

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
      route.current = new google.maps.DirectionsService()
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

  const makeRoute = (a, b) => {
    const origin = a.geometry.location
    const destination = b.geometry.location
    route.current.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result)
          setDirections(result)
        } else {
          console.error(`error fetching directions ${result}`);
        }

      }
    )

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
    {directions ? 
    <DirectionsRenderer
    directions={directions}
    /> : null}
  </GoogleMap>

  if (props.status) {

    return (
      <>
        <div className='mapContainer'>
          {/* TodoList handles the list of Todo trip items */}
          <TodoList
            todos={todos}
            setTodos={setTodos}
            makeRoute={makeRoute}
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
      </>
    )
  }
  return null
}

export default MapContainer;