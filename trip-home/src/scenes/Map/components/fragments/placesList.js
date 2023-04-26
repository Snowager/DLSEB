import { React, useState } from 'react'
import Places from "../fragments/places"

import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import StarRatings from 'react-star-ratings';

import MarkerWindow from "../fragments/markerWindow"

import "../styles/map.css"

/*

The TodoList manages mapping Todos to their corresponding list location

Passed todo list, as well as parent state function for setting todo list state

*/

const PlacesList = (props) => {

  const [selectedPlace, setSelectedPlace] = useState()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(props.selected)

  const handleClose = () => {
    setOpen(false)
    setSelectedPlace(null)
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

  return (
    <>
      {open ? (
        <Modal open={open} onClose={handleClose} className="todo-info-modal" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img className="modal-and-map-photos" src={selectedPlace.photos ? (selectedPlace.photos[0].getUrl()) : "https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg"} alt={"picture of " + selectedPlace.name} />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="starContainer todo-star-modal">
                <div className='star'>
                  <StarRatings rating={selectedPlace.rating} starRatedColor="purple" starDimension="20px" starSpacing="8px" />
                </div>
                <span className="rating" style={{ color: "blue" }}>{selectedPlace.rating} </span>
              </div>
              <p>ratings total: ({selectedPlace.user_ratings_total})</p>
              <p>{selectedPlace.name}</p>
              <p> {selectedPlace.formatted_address} </p>

            </Typography>
          </Box>
        </Modal>) : null}
      <div className='places-list'>
        <h1 className='text-center text-white'>Places</h1>
        {/*
            <div style={{ display: "flex", flexDirection: "row",width:"40%" }}>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("food", selected.geometry.location)}>Food</button>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("hotel", selected.geometry.location)}>Hotel</button>
                <button className='btn--primary btn' onClick={() => props.modifyMarkers("fun", selected.geometry.location)}>Activity</button>
              </div>
        */}
        {
          props.todos.map((todo, index) => (
            <Places
              todo={todo}
              index={index}
              setTodos={props.setTodos}
              setSelectedPlace={setSelectedPlace}
              setOpen={setOpen}
              onClick={props.onClick}
              setSelected={props.setSelected}
            />
          ))

        }
      </div>
    </>

  )
}

export default PlacesList

