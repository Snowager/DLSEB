import { React, useState } from 'react'
import Todo from "../fragments/todo"

/*

The TodoList manages mapping Todos to their corresponding list location

Passed todo list, as well as parent state function for setting todo list state

*/

const TodoList = (props) => {

    // removes todo using a passed index value (accessed inside of actual todo)
    const removeTodo = (index) => {
        const newTodos = [...props.todos];
        newTodos.splice(index, 1);
        // calls setTodo parent state function with new todo list after splicing
        props.setTodos(newTodos);
    }

    return (
        <div>
        {
            props.todos.map((todo, index) => (
                <Todo
                    todo={todo}
                    index={index}
                    removeTodo={removeTodo}
                />
            ))
        }
        </div>

    )
}

export default TodoList