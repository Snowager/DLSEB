import React, { useState } from 'react'


import "../styles/map.css"

/*

The Todo (not my name choice) is a Trip Node button that corresponds with a selected trip location 

Passed the current todo, as well as parent state function for deleting via index

*/

const Places = (props) => {



  const [addtotrip, setAddtotrip] = React.useState(false);
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleAddtotrip = () => setAddtotrip(true);
  const handleClose = () => setOpen(false)
  console.log(open)
  return (
    <>
      <div className="container">



        <div className="row todo-list-opacity todo-list-margin" onClick={() => (props.setSelectedPlace(props.todo), props.setOpen(true))}>
          <div className="col-md-4 todo todo-list-photos" >
            {props.todo.photos ? (<img className="img-fluid w-80 todo-list-photos" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />) :
              <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}
          </div>

          <div className="col-xl">
            {props.todo.name}
          </div>
        </div>
        <div className="placeslisttemp">
          <button
            onClick={() => {
              props.setTodos(prevTodos => [...prevTodos, props.todo])
              props.onClick()
            }}>
            Add to trip
          </button>
        </div>

        <div className="todo-list-splitters"></div>
      </div>
    </>
  );
}









export default Places





