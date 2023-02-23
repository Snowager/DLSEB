import React, { useState, useEffect, useRef } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Save_trip_button from '../fragments/save_trip_button.js';
import StarRatings from 'react-star-ratings';
import "../styles/map.css"


// passes props to the map container
function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input todo-list-margin todo-form "
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add Your Own Place!"
      />
    </form>
  );
}
function Todo({ todo, index, removeTodo }) {
  return (
    <div className="container">
      <div className="row todo-list-margin">
        <div className="col-md-4 todo">
          <img className="" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />
        </div>
        <div className="col-md-1"></div>
        <div className="col-xl-5">
          {todo.text}
        </div>
        <div className="col-md-1">
          <button className="Remove_Button" onClick={() => removeTodo(index)}>
            <i class="fa fa-trash" aria-hidden="true"> </i>
          </button>
        </div>
      </div>
    </div>
  );
}

const MapContainer = (props) => {
  const [todos, setTodos] = React.useState([
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };


  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  const [value, setValue] = React.useState("");

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
    width: "70%"
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
    }
  )

  // container for the map

  // lines underneath are options
  const map = <GoogleMap
    mapContainerStyle={mapStyles}
    zoom={props.zoom}
    center={defaultCenter}
    onLoad={onLoad}>


    {/* brackets let us use javascript inline */}


    {/* this format (item + && + (functional output)) checks for places being not null, before trying to map the markers in our array*/}
    {
      places &&
      (
        ({/* Marker options. Needs a key and position to display on map. position is lat/lng coords */ }),
        markers.map(places => (
          <Marker
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
            {selected.name} {selected.priceString ? "(" + selected.priceString + ")" : ""}
          </h4>
          <p>
            {selected.formatted_address}
          </p>
          <button
            onClick={() => {
              addTodo(selected.name, selected.place_id);
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
          {/* conditional function to display mapped divs only if the "trip" array is not empty */}
          {/* This returns our list --TODO-- add overlay div (z-index, position: absolute in css) */}

          <div className="tripContainer">
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
          </div>
        </div>
        <Save_trip_button id={props.id} trip={trip} city={props.city}/>
      </>
    )
  }
  return null
}

export default MapContainer;