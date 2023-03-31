import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import "../../../Splash/components/styles/button.css"
import { display } from '@mui/system';
import Save_trip_button from '../fragments/save_trip_button.js';
import StarRatings from 'react-star-ratings';
import "../styles/map.css"
import MarkerStyle from '../../images/markerTemplate4.svg'

const Service = (props) => {
    const google = window.google;
    const [currMap, setMap] = useState(props.map)
    const [query, setQuery] = useState(props.type.split("_"))
    const service = useRef(null)
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [trip, setTrip] = useState([]);
    // const [photo, setPhoto] = useState(null);
    const places = [];
    const [todos, setTodos] = React.useState([
    ]);
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
    {
      places &&
      (
        ({/* Marker options. Needs a key and position to display on map. position is lat/lng coords */ }),
        markers.map(places => (
          <Marker
            icon={icon}
            
            key={places.place_id}
            position={places.geometry.location}
            onClick={() => {
              setSelected(places)
              console.log(selected)
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
          {selected.photos ? <img src={selected.photos[0].getUrl()} alt={"picture of "+selected.name}></img> : null}
          
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
            {selected.name} {selected.priceString ? "(" + selected.priceString + ")" : ""}
          </h4>
          <p>
            {selected.formatted_address}
          </p>
          <button
            onClick={() => {
              setTodos([...todos, selected]);
              handleOpen()
            }}>
            Add to trip
          </button>
        </div>
      </div>
    </InfoWindow>) : null}
  </GoogleMap>

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  
  if (props.status) {

    return (
      <>
        <div className='mapContainer'>
          <div className="todo-list">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            ))}
            <TodoForm addTodo={addTodo} />
          </div>
          {map}
          {open ? <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Now where?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Click one of the buttons below to change your available locations.
              </Typography>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className='btn--primary btn' onClick={() => (modifyMarkers("food", selected.geometry.location)) }>food</button>
              <button className='btn--primary btn' onClick={() => modifyMarkers("hotel", selected.geometry.location)}>hotel</button>
              <button className='btn--primary btn' onClick={() => modifyMarkers("fun", selected.geometry.location)}>activity</button>
            </div>

          </Box>
        </Modal> : null}

      
        </div>
        <Save_trip_button id={props.id} trip={trip} city={props.city}/>
      </>
    )
  }
  return null
}

export default MapContainer;