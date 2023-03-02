import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, Marker, } from '@react-google-maps/api';
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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  // const [photo, setPhoto] = useState(null);
  const places = [];
  const [todos, setTodos] = React.useState([]);
  const [package_status, setPackage_status] = useState("loading");

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

  //Creates a trip consisting of a dinner and a movie node
  const dinner_movie = () => {
    setPackage_status("complete");
    var dinner = {
      location: center,
      radius: "5",
      query: "dinner"
    }
    var movie = {
      location: center,
      radius: "5",
      query: "movie"
    }
    service.current.textSearch(dinner, callback);
    function callback(results, status) {
      var num = Math.floor(Math.random() * (results.length -1));
      console.log(num)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setTodos([...todos, results[num]]);
        service.current.textSearch(movie, addMovie);
      }
    }
    function addMovie(results, status){
      var num = Math.floor(Math.random() * (results.length -1));
      console.log(num)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        setTodos([...todos, results[num]]);
      }
    }
  }

  //Generate packages if necessary
  const packages = () => { // ---TODO--- Not sure where the appropriate place to put this is, Everything needs to be loaded on the map before it can be executed
    console.log(service.current)
    if(props.package === "dinner_movie" && package_status === "ready"){
      console.log("dinner_movie package loading");
      dinner_movie();
    }
    else if(props.package === "family" && package_status === "ready"){
      console.log("family package loading");
    }
    else if(props.package === "weekend_vacation" && package_status === "ready"){
      console.log("weekend_vacation package loading");
    }
    else{console.log("no package chosen");}
  }

  useEffect(() => {
    console.log(markers.length)
    if(service.current !== null && markers.length > 0){ packages();}
  }, [package_status])
  

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