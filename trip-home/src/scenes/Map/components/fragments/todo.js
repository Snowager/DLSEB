import React, { useState } from 'react'
import { Modal } from '@mui/material';
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import StarRatings from 'react-star-ratings';
import "../styles/map.css"

/*

The Todo (not my name choice) is a Trip Node button that corresponds with a selected trip location 

Passed the current todo, as well as parent state function for deleting via index

*/

const Todo = (props) => {

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
    const [del, setDel] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleDel = () => setDel(true);
    const handleClose = () => setOpen(false) + setDel(false);
    return (
        <>
      <div className="containerToDo">
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
        {del ? <Modal open={del} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete Item?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <p>Are you sure you would like to remove {props.todo.name} from your trip?</p>
            </Typography>
            <button className='btn btn-success' onClick={() => handleClose()}>Keep</button>
            <button className='btn btn-danger' onClick={() => {props.removeTodo(props.index) ; handleClose()}}>DELETE</button>
          </Box>
        </Modal> : null}

        <div className="row todo-list-opacity todo-list-margin" onClick={handleOpen}>
          <div className="col-md-4 todo todo-list-photos">
            {props.todo.photos ? (<img className="img-fluid w-80 todo-list-photos" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />) :
              <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}
          </div>
          <div className="col-md-1"></div>
          <div className="col-xl-5">
            {props.todo.name}
          </div>
          <div className="col-md-1">
            <button className="Remove_Button" onClick={() => handleDel()}>
              <i className="fa fa-trash" aria-hidden="true"> </i>
            </button>
          </div>
        </div>
        <div className="todo-list-splitters"></div>
      </div>
      </>
    );
}







    

export default Todo








// function Todo({ todo, index, removeTodo }) {
//     const [open, setOpen] = React.useState(false);
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return (
//         <div className="container">
//             {open ? <Modal open={open} onClose={handleClose} className="todo-info-modal" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//                 <Box sx={style}>
//                     <Typography id="modal-modal-title" variant="h6" component="h2">
//                         <img className="img-fluid w-80" src={todo.photos[0].getUrl()} alt={"picture of " + todo.name} />
//                     </Typography>
//                     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                         <div className='star'>
//                             <StarRatings rating={todo.rating} starRatedColor="purple" starDimension="20px" starSpacing="8px" />
//                             <span className="rating" style={{ color: "blue" }}>{todo.rating} </span>
//                         </div>
//                         <p>ratings total: ({todo.user_ratings_total})</p>
//                         <p className="h4">{todo.name}</p>
//                         <p> {todo.formatted_address} </p>
//                     </Typography>
//                 </Box>
//             </Modal> : null}
//             <div className="row todo-list-opacity todo-list-margin" onClick={handleOpen}>
//                 <div className="col-md-4 todo todo-list-photos">
//                     {todo.photos ? (<img className="img-fluid w-80 todo-list-photos" src={todo.photos[0].getUrl()} alt={"picture of " + todo.name} />) :
//                         <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}

//                 </div>
//                 <div className="col-md-1"></div>
//                 <div className="col-xl-5">
//                     {todo.name}
//                 </div>
//                 <div className="col-md-1">
//                     <button className="Remove_Button" onClick={() => removeTodo(index)}>
//                         <i class="fa fa-trash" aria-hidden="true"> </i>
//                     </button>
//                 </div>
//             </div>
//             <div className="todo-list-splitters"></div>
//         </div>
//     );
// }
