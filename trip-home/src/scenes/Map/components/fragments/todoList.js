import { React, useState } from 'react'
import Todo from "../fragments/todo"

const TodoList = (props) => {

    const removeTodo = (index) => {
        const newTodos = [...props.todos];
        newTodos.splice(index, 1);
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