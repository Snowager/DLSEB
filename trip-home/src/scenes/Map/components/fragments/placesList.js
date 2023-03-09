import { React, useState } from 'react'
import Places from "../fragments/places"
import "../styles/map.css"

/*

The TodoList manages mapping Todos to their corresponding list location

Passed todo list, as well as parent state function for setting todo list state

*/

const PlacesList = (props) => {

    // removes todo using a passed index value (accessed inside of actual todo)
    const removeTodo = (index) => {
        const newTodos = [...props.todos];
        newTodos.splice(index, 1);
        // calls setTodo parent state function with new todo list after splicing
        props.setTodos(newTodos);
    }

    return (
        <div className='places-list'>
            <h1>Places</h1>
            {
                props.todos.map((todo, index) => (
                    <Places
                        todo={todo}
                        index={index}
                        removeTodo={removeTodo}
                    />
                ))
                
            }
        </div>

    )
}

export default PlacesList

