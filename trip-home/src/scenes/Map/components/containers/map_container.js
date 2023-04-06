import React, { useState, useRef, useEffect } from 'react';
import { DirectionsRenderer, GoogleMap, TrafficLayer, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css";
import Save_trip_button from '../fragments/save_trip_button.js';
import "../styles/map.css"
import TodoList from "../fragments/todoList"
import PlacesList from "../fragments/placesList"
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
  const [radius, setRadius] = useState(5)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [trip, setTrip] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [directions, setDirections] = useState([]);
  const [package_status, setPackage_status] = useState(-1);
  const [mode, setMode] = useState("DRIVING");

  const handleChoiceClose = () => setOpen(false);


  // helper function to get a random value from 0-max (non-inclusive)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  // helper function to get a random value from 0-max (non-inclusive)
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // React callback to load map
  const onLoad = React.useCallback(
    function onLoad(map) {
      // initialize our service's current state to reuse later (place service)
      service.current = new google.maps.places.PlacesService(map)
      route.current = new google.maps.DirectionsService()
      // length == 1 means a button was pressed
      if (query.length == 1) {
        var request = {
          location: center,
          query: query[0]
        };
        service.current.textSearch(request, serviceCallback);
        function serviceCallback(results, status) {
          // only pushes results if it gets an OK status
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            // 
            for (var i = 0; i < results.length; i++) {
              setPrices(results[i])
            }
            setMarkers(results)
          }
          // --TODO-- add "else" block for a failed status return
        }    // a package was clicked
      } else {
        setPackage_status(0);
      }
    }
  )

  //Runs after the package_status has been set in the onLoad function (line 76)
  useEffect(() => {
    if (package_status !== -1 && package_status < query.length) {
      var request = {
        location: center,
        query: query[package_status]
      };
      service.current.textSearch(request, callback);
      function callback(results, status) {
        // only pushes results if it gets an OK status
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          var choice = results[getRandomInt(results.length/4)]
          setPrices(choice)
          setTodos(prevTodos => [...prevTodos, choice])
          setPackage_status(package_status + 1)
          // TODO --- Add some form of markers, or a choice modal for generating the next set of choices

        }
      }
    }
  }, [package_status])

  // 
  const rad = (x) => {
    return x * Math.PI / 180;
  };

  // Haversine formula to calculate distance between two points on the planet
  // credit to https://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
  const calculateDistance = (p1, p2) => {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lat() - p1.lat);
    var dLong = rad(p2.lng() - p1.lng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    d = d * 0.000621371
    //console.log(d)
    //console.log(radius)
    return d; // returns the distance converted from meter to miles
  }


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
    setCenter({lat: selected.geometry.location.lat(), lng: selected.geometry.location.lng()})
    setSelected(null)
    handleChoiceClose()
    changeMarker(query, center)
    //if (todos.length >= 2) makeRoute(todos[todos.length-2], todos[todos.length-1]) THIS IS WHAT YOU HAD BEFORE AND IT WORKED
    //makeFullRoute(); THIS DOES PRETTY MUCH THE SAME EXACT THING BUT FOR SOME REASON THE DOM STILL THINKS THAT THERES NOTHING IN THE DIRECTIONS ARRAY
  }

  // reusable helper service function to modify marker positions
  const changeMarker = (query, center) => {
    var request = {
      location: center,
      query: query
    };
    service.current.textSearch(request, callback);
    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          setPrices(results[i])
        }
        setMarkers(results)
      }
      setMarkers(results)
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
          setDirections(prevDirections => [...prevDirections, result])
        } else {
          console.error(`error fetching directions ${result}`);
          return null
        }
      }
    )
  }

  //creates routes between all items in the todo List
  const makeFullRoute = () => {
    setDirections([]);
    for(var x = 0; x < todos.length-1; x++){
        makeRoute(todos[x], todos[x + 1])
    }
  }
  
  //change the routes everytime the todos change
  useEffect(() => {
    if(todos.length > 1) makeFullRoute();
  }, [todos])

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
        <TrafficIcon sx={{ mr: 1 }} />
        Traffic
      </Fab>
      <Save_trip_button id={props.id} trip={trip} city={props.city} />
    </div>

    {/* MarkerInterface component handles the markers and marker infoWindows on the map  */}
    <MarkerInterface
      markers={markers}
      center={center}
      selected={selected}
      setSelected={setSelected}
      calculateDistance={calculateDistance}
      radius={radius}
      setOpen={setOpen}
      open={open}
      todos={todos}
      setTodos={setTodos}
      google={google}
    />
    {directions ? (directions.map((direction, index) => (
      <>
        <DirectionsRenderer
          directions={direction}
          key={index} />
      </>
    ))
    ) : null}
    {traffic ? (<TrafficLayer />) : null}
  </GoogleMap>

  if (props.status) {
    return (
      <>
        <div className='mapContainer'>
          {markers.length > 0 ? (
            <PlacesList
              onClick={() => setOpen(true)}
              todos={markers}
              setTodos={setTodos}
              open={open}
            />) : null}
          {todos ? (
            <TodoList
              todos={todos}
              setTodos={setTodos}
              setRadius={setRadius}
            />) : null}
          {map}
          {/* TodoList handles the list of Todo trip items */}



          {/* ChoiceModal is the modal for making a new trip choice */}

          {/* only opens if marker added to trip (tracked using open bool)*/}
          {open ? <ChoiceModal
            selected={todos[todos.length - 1]}
            open={open}
            handleClose={handleChoiceClose}
            modifyMarkers={modifyMarkers}
            makeFullRoute={makeFullRoute}
            makeRoute={makeRoute}
            todos={todos}
          /> : null}

        </div>

        {/*  {places ? (places.map((place, index) => (<div><p>{place.name}</p></div>) )): null  }*/}
        
      </>
    )
  }
  return null
}

export default MapContainer;