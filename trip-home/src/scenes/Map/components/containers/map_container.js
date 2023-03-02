import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css"
import Save_trip_button from '../fragments/save_trip_button.js';
import "../styles/map.css"
import TodoList from "../fragments/todoList"
import ChoiceModal from '../fragments/choiceModal';
import MarkerInterface from '../fragments/markerInterface';

const MapContainer = (props) => {
  const google = window.google;
  const [currMap, setMap] = useState({})
  const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
  const [mapStyles, setMapStyles] = useState({
    height: "100vh",
    width: "100%"
  })
  const [query, setQuery] = useState(props.type)
  const service = useRef(null)
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [trip, setTrip] = useState([]);
  // const [photo, setPhoto] = useState(null);
  const places = [];
  const [todos, setTodos] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // React callback to load map
  const onLoad = React.useCallback(
    function onLoad(map) {
      var request = {
        location: center,
        radius: "5",
        query: query
      };
      service.current = new google.maps.places.PlacesService(map)
      console.log(service)
      service.current.textSearch(request, callback);
      function callback(results, status) {
        // only pushes results if it gets an OK status
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            var price = ""
            for (var j = 0; j < results[i].price_level; j++) {
              price += "$"
            }
            results[i].priceString = price;
            places.push(results[i])
          }
          setMarkers(places)
        }
        // --TODO-- add "else" block for a failed status return
      }
    }, [center]
  )

  const changeMarker = (query, center) => {
    var request = {
      location: center,
      radius: "5",
      query: query
    };
    console.log(service)
    service.current.textSearch(request, callback);
    function callback(results, status) {
      console.log(status)
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          places.push(results[i])
        }
        setMarkers(places)
      }
    }
  }


  const map = <GoogleMap
    ref={(map) => setMap(map)}
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={center}
    onLoad={onLoad}
  >
    <MarkerInterface 
    places={places}
    markers={markers}
    selected={selected}
    setSelected={setSelected}
    setOpen={setOpen}
    todos={todos}
    setTodos={setTodos}
    google={google}
    />

  </GoogleMap>

  const modifyMarkers = (query, center) => {
    setCenter(selected.geometry.location)
    setSelected(null)
    setMarkers([])
    handleClose()
    changeMarker(query, center)
  }

  const onSelect = item => {
    setSelected(item);
  }

  


  if (props.status) {

    return (
      <>
        <div className='mapContainer'>
          <div className="todo-list">
            <TodoList
             todos={todos}
             setTodos={setTodos}
            />              
          </div>
          {map}
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