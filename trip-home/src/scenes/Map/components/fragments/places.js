import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import StarRatings from 'react-star-ratings';
import "../styles/map.css"
import MarkerWindow from "../fragments/markerWindow"

/*

The Todo (not my name choice) is a Trip Node button that corresponds with a selected trip location 

Passed the current todo, as well as parent state function for deleting via index

*/

const Places = (props) => {

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

    const [open, setOpen] = React.useState(false);
    const [addtotrip, setAddtotrip] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleAddtotrip = () => setAddtotrip(true);
    const handleClose = () => setOpen(false) + setAddtotrip(false);
    return (
        <>
      <div className="container">
        {open ? <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <img className="img-fluid w-80" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="starContainer">
                <div className='star'>
                  <StarRatings rating={props.todo.rating} starRatedColor="purple" starDimension="20px" starSpacing="8px" />
                </div>
                <span className="rating" style={{ color: "blue" }}>{props.todo.rating} </span>
              </div>
              <p>ratings total: ({props.todo.user_ratings_total})</p>
              <p>{props.todo.name}</p>
              <p> {props.todo.formatted_address} </p>
              
            </Typography>
          </Box>
        </Modal> : null}

        {addtotrip ? <Modal open={addtotrip} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
  
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>

            </Typography>

          </Box>
        </Modal> : null}

        <div className="row todo-list-opacity todo-list-margin" onClick={handleOpen}>
          <div className="col-md-4 todo todo-list-photos">
            {props.todo.photos ? (<img className="img-fluid w-80 todo-list-photos" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />) :
              <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}
          </div>

          <div className="col-xl">
            {props.todo.name}
          </div>
          <div className="placeslisttemp">
            <button
              onClick={() => {
                  handleAddtotrip()
                  props.setTodos(prevTodos => [...prevTodos, props.selected])
                  props.onClick()
              }}>
              Add to trip
          </button>
          </div>
        </div>
        <div className="todo-list-splitters"></div>
      </div>
      </>
    );
}







    

export default Places





