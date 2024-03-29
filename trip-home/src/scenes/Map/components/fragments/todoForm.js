import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import "../styles/map.css"

// modal styling
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

const TodoForm = (props, addTodo) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(props.chosenPlace.name);
  const [address, setAddress] = useState(props.chosenPlace.address);

  // passes name and address fields from "Add Your Own Place" modal/form to my trip list
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
      {/* opens "Add Your Own Place" Modal */}
      <button className="btn btn btn-light add-your-place-button" onClick={handleOpen}> Add Your Own Place </button>
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

                {/* name input excepts user input by typing in the corresponding textarea field */}
                <label className="todo-form-label">Place Name:</label>
                <input
                  className="todo-form-input"
                  size="34"
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                {/* address input excepts user input by using the "Pick A Location" button to select an address for the textarea field */}
                <label className="todo-form-label">Place Address:</label>
                <input
                  className="todo-form-input"
                  size="30"
                  readOnly={true} // doesn't let user edit address from textarea field 
                  required={true}
                  value={props.chosenPlace.address}
                />

                <button
                  className="todo-form-location-button"
                  onClick={() => {
                    // removes markers from google map and allows the user to click on the map to pass an 
                    // address to the "Add Your Own Place" modal/form
                    props.setTempState(props.markers)
                    props.setMarkers([])
                    props.setClickMode(true)
                    handleClose()
                  }}>
                  <i className='fas fa-crosshairs'></i>
                </button>

                <button
                  className='todo-form-submit-button'
                  onClick={() => {
                    // passes back the modified function containing all previous todos (with spread syntax ...) 
                    // and adds an object containing the values from the form
                    props.setTodos(prevTodos => [...prevTodos, { name: name, formatted_address: props.chosenPlace.address, geometry: {location: {lat:props.chosenPlace.lat, lng:props.chosenPlace.lng}},  rating: 0, user_rating_total: 0 }])
                    props.setChosenPlace({ name: null, address: null })
                    handleClose()

                    //empties both text area fields once form is submitted
                    props.chosenPlace.address = null;
                    setName(null);
                  }}>
                  Add To Trip
                </button>

              </form>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default TodoForm

