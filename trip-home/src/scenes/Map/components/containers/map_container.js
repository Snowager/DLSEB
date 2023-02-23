import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow, } from '@react-google-maps/api';
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import "../../../Splash/components/styles/button.css"
import { display } from '@mui/system';

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
  const places = []

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
        console.log(status)
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            places.push(results[i])
          }
          setMarkers(places)
        }
      }
    }, [center]
  )

  const changeMarker = () => {
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
    {selected ? (<InfoWindow
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
            handleOpen()
          }}>
          Add to trip
        </button>

      </div>
    </InfoWindow>) : null}
  </GoogleMap>

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const modifyMarkers = (query) => {
    setCenter(selected.geometry.location)
    setSelected(null)
    setMarkers([])
    setQuery(query)
    handleClose()
    changeMarker()
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
              <button className='btn--primary btn' onClick={() => (
                modifyMarkers("food")) }>food</button>
              <button className='btn--primary btn' onClick={() => modifyMarkers("hotel")}>hotel</button>
              <button className='btn--primary btn' onClick={() => modifyMarkers("fun")}>activity</button>
            </div>

          </Box>
        </Modal> : null}
        {trip && (
          trip.map(tripNodes => (
            console.log(tripNodes.geometry.location),
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