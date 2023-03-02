import React, { useState } from 'react'
import "../styles/map.css"

const Todo = (props) => {

    return (
        <>
        {console.log(props.todo.name)}
            <div className="container">
                <div className="row ">
                    <div className="col-md-4 todo">
                        {props.todo.photos ? (<img className="img-fluid w-80" src={props.todo.photos[0].getUrl()} alt={"picture of " + props.todo.name} />) :
                            <img className="img-fluid w-80" src="https://bacibacirestaurant.files.wordpress.com/2020/02/chairs-cutlery-fork-9315.jpg" alt="temp food place" />}
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-xl-5">
                        {props.todo.name}
                    </div>
                    <div className="col-md-1">
                        <button className="Remove_Button" onClick={() => (props.removeTodo(props.index))}>
                            <i class="fa fa-trash" aria-hidden="true"> </i>
                        </button>
                    </div>
                </div>
                <div className="todo-list-splitters"></div>
            </div>
        </>
    )
}

export default Todo