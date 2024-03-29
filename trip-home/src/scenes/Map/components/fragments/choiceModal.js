import { React, useState } from "react"
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { withTheme } from "@emotion/react";
import fun_list from "../fun.json"
import "../styles/map.css"

/*

The choice Modal is a popup menu that allows a user to pick a new "trip type" for the next set of markers to look at on the map

Generated using Material UI Modal component

Passed the currently selected marker, as well as handling functions from map parent to modify map's state
*/


const ChoiceModal = (props) => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
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

  const [open, setOpen] = useState(true)
  const [selected, setSelected] = useState(props.selected)
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") {
      return
    }
    setOpen(!open)

  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <button className='btn--primaryRED choice-modal-exit' onClick={handleClose}>X</button>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose your next category


        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Click one of the buttons below to change your available locations.
        </Typography>
        <div className="choice-modal-buttons" style={{ display: "flex", flexDirection: "row" }}>
          <button className='btn--primary btn' onClick={() => props.modifyMarkers("food", selected.geometry.location)}>Food</button>
          <button className='btn--primary btn' onClick={() => props.modifyMarkers("hotel", selected.geometry.location)}>Hotel</button>
          <button className='btn--primary btn' onClick={() => props.modifyMarkers(fun_list.fun_list[getRandomInt(fun_list.fun_list.length - 1)], selected.geometry.location)}>Activity</button>
        </div>

      </Box>
    </Modal>
  )

}

export default ChoiceModal