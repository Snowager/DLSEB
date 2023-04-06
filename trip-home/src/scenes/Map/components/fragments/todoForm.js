import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "../styles/hello.css"

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

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
















const google = window.google;
const myLatlng = { lat: -25.363, lng: 131.044 };
const map = <GoogleMap
  // create map reference


  zoom={8}
  center={myLatlng}
>
</GoogleMap>
// Create the initial InfoWindow.
let infoWindow = new google.maps.InfoWindow({
  content: "Click the map to get Lat/Lng!",
  position: myLatlng,
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
  infoWindow.setContent(
    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
  );
  infoWindow.open(map);


  var geocoder = new google.maps.Geocoder();             // create a geocoder object
  var location = new google.maps.LatLng(mapsMouseEvent.latLng.lat(), mapsMouseEvent.latLng.lng());    // turn coordinates into an object          
  geocoder.geocode({ 'latLng': location }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {           // only geocodes if status returned is OK
      var address = results[0].formatted_address;         // if address is found pass to processing function
      console.log(address);
    }
  });


});











function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCqZGpZi8NbIqDp7jvaKZKCWDqMT3-_kr4",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <button onClick={handleOpen}> Pick a Location </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <h2 id="child-modal-title">Add Map</h2>
          <div>{map} </div>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

const TodoForm = (props, addTodo) => {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { name, address };

    if (!name) return;
    addTodo(name)
    setName("");

    if (!address) return;
    addTodo(address)
    setAddress("");

    console.log(object);
  }

  return (
    <div>
      <button onClick={handleOpen}> Add Your Own Place </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="">
              <h2>Add Your Own Place</h2>
              <form onSubmit={handleSubmit}>
                <label>Place Name:</label>
                <textarea
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Place Address:</label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

                <button
                  onClick={() => {
                    // passes back the modified function containing all previous todos (with spread syntax ...) 
                    // and adds an object containing the e.target values from the form
                    props.setTodos(prevTodos => [...prevTodos, { name: name, formatted_address: address, rating: 0, user_rating_total: 0 }])
                    handleClose()
                  }}>
                  Add to trip
                </button>

              </form>
            </div>
          </Typography>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}

export default TodoForm

