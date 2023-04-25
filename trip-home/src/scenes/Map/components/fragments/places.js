import React, { useState } from 'react'


import "../styles/map.css"

/*

The place is a Trip Node button that corresponds with a visible trip location marker 

Passed parent state functions for setting the current selected place and opening the parent modal menu

*/

const Places = (props) => {

  return (
    <>
      <div className="container">
        <div className="row places-list-opacity todo-list-margin" onClick={() => (props.setSelectedPlace(props.todo), props.setOpen(true))}>
          <div className="col-xl todo todo-list-photos" >
            {props.todo.photos ? (<img className="img-fluid w-80 todo-list-photos" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />) :
              <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}
          </div>

          <div className="col-xl">
            {props.todo.name}
          </div>
        </div>

        <div className="row placeslisttemp">
          <div className="col">
            <button className='btn btn-light add-to-trip-button'
              onClick={() => {
                props.setTodos(prevTodos => [...prevTodos, props.todo])
                props.setSelected(props.todo)
                props.onClick()
              }}>
              Add to trip
            </button>
          </div>
          <div className="col">
            <button className="btn--outlineSmall" onClick={() => props.onClick()}>
              <i className="fa fa-star  " aria-hidden="true"> </i>
            </button>
          </div>
        </div>

        <div className="todo-list-splitters"></div>
      </div>
    </>
  );
}









export default Places






