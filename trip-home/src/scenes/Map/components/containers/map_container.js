import React, { useState, useRef, useEffect } from 'react';
import { DirectionsRenderer, GoogleMap, TrafficLayer, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css";
import Save_trip_button from '../fragments/save_trip_button.js';
import "../styles/map.css";
import TodoList from "../fragments/todoList";
import ChoiceModal from '../fragments/choiceModal';
import MarkerInterface from '../fragments/markerInterface';
import { Fab } from '@mui/material';
import TrafficIcon from '@mui/icons-material/Traffic';

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
  console.log(center)
  const [mapStyles, setMapStyles] = useState({
    height: "100vh",
    width: "100%"
  })
  // query is now initially set to a string array to account for potentially multiple passed types
  const [query, setQuery] = useState(props.type.split("_"))
  // use ref allows us to maintain state even when in a function's scope
  const service = useRef(null)
  const [traffic, setTraffic] = useState(false)
  const route = useRef(null)
  const [radius, setRadius] = useState(1)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  // const [photo, setPhoto] = useState(null);
  const places = [];
  const [todos, setTodos] = useState([]);
  const [directions, setDirections] = useState([]);
  const [package_status, setPackage_status] = useState(-1);
  const [mode, setMode] = useState("DRIVING");

  const handleClose = () => setOpen(false);


  // helper function to get a random value from 0-max (non-inclusive)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // React callback to load map
  const onLoad = React.useCallback(
    function onLoad(map) {
      // initialize our service's current state to reuse later (place service)
      service.current = new google.maps.places.PlacesService(map)
      // length == 1 means a button was pressed
      if (query.length == 1) {
        var request = {
          location: center,
          radius: "5",
          query: query[0]
        };
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

      // a package was clicked
      } else {
        setPackage_status(0);
      }
    }
  )

  //Runs after the package_status has been set in the onLoad function (line 76)
  useEffect(() => {
    if(package_status !== -1 && package_status < query.length) {
      var request = {
        location: center,
        radius: 100,
        query: query[package_status]
      };
      service.current.textSearch(request, callback);
      function callback(results, status) {
        // only pushes results if it gets an OK status
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var choice = results[getRandomInt(results.length)]
          setPrices(choice)
          setTodos(prevTodos => [...prevTodos, choice])
          setPackage_status(package_status + 1)
          // TODO --- Add some form of markers, or a choice modal for generating the next set of choices

        }
      }
    }
  }, [package_status])
  

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
    if (todos.length >= 2) makeRoute(todos[todos.length-2], todos[todos.length-1]) 
  }

  // reusable helper service function to modify marker positions
  const changeMarker = (query, center) => {
    (console.log(currMap))
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
        travelMode: mode
      },
      function callback(result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          console.log(result)
          directions.push(result)
        } else {
          console.error(`error fetching directions ${result}`);
          return null
        }
      }
    )

  }


  // map object
  const map = <GoogleMap
    // create map reference
    ref={ref => setMap(ref)}
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={center}
    onLoad={onLoad}
  >
    <div className='d-flex justify-content-center p-2'>
    <Fab variant='extended' size='medium' color='success' aria-label='add' onClick={() => setTraffic(!traffic)}>
      <TrafficIcon sx={{ mr: 1}} />
      Traffic
    </Fab>
    </div>
    
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
    {directions ? (directions.map((direction, index) => (
      <DirectionsRenderer
      directions={direction}
      key={index} />
    ))
    ) : null}
    {traffic ? (<TrafficLayer/>) : null}
  </GoogleMap>

  if (props.status) {
    return (
      <>
      {console.log(mode)}
        <div className='mapContainer'>
          {/* TodoList handles the list of Todo trip items */}
          
          <TodoList
            todos={todos}
            setTodos={setTodos}
            makeRoute={makeRoute}
            setMode={setMode}
          />
          {map}
          {/* ChoiceModal is the modal for making a new trip choice */}
          {/* only opens if marker added to trip (tracked using open bool)*/}
          {open ? <ChoiceModal
            selected={selected}
            open={open}
            handleClose={handleClose}
            modifyMarkers={modifyMarkers}
            makeRoute={makeRoute}
            todos={todos}
          /> : null}
        </div>
        <Save_trip_button id={props.id} trip={trip} city={props.city} />
      </>
    )
  }
  return null
}

export default MapContainer;