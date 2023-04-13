import { React, useState } from 'react'
import Todo from "../fragments/todo"
import TravelMode from '../fragments/travelMode';
import RadiusSlider from './radiusSlider';
import BudgetSlider from './budgetSlider';
import "../styles/map.css"
import Save_trip_button from '../fragments/save_trip_button.js';

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
    const todos = props.todos;
    return (
        <div className='todo-list'>
            <RadiusSlider setRadius={props.setRadius} />
            <BudgetSlider setBudget={props.setBudget} />
            <TravelMode option={["Car", "Bus", "Bike", "Walk"]} value={["DRIVING", "TRANSIT", "BICYCLING", "WALKING"]} size={20} setMode={props.setMode} />
            <h1 className='text-center'>Your Trip</h1>
            {
            
                props.todos.map((todo, index) => (
                    <Todo
                        todo={todo}
                        index={index}
                        key={index}
                        removeTodo={removeTodo}
                    />
                ))
                
            }
<div class="text-center">
            <Save_trip_button id={props.id} trip={todos} city={props.city} />
</div>
        </div>

    )
}

export default TodoList

