import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

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
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(props.chosenPlace.name);
  const [address, setAddress] = useState(props.chosenPlace.address);

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
                  required={true}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Place Address:</label>
                <textarea
                  readOnly={true}
                  required={true}
                  value={props.chosenPlace.address}
                />

                <button
                  onClick={() => {
                    // passes back the modified function containing all previous todos (with spread syntax ...) 
                    // and adds an object containing the e.target values from the form
                    props.setTodos(prevTodos => [...prevTodos, { name: name, formatted_address: props.chosenPlace.address, rating: 0, user_rating_total: 0 }])
                    handleClose()
                  }}>
                  Add to trip
                </button>

                <button
                  onClick={() => {
                    props.setTempState(props.markers)
                    props.setMarkers([])
                    props.setClickMode(true)
                    handleClose()
                  }}>
                  Pick a location
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

