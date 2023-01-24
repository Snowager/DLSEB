import React from 'react';
import './SearchBar.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
const searchbar = (props) => {
    return (
        <div className="SearchBar">
            <p onClick={props.click}>Location: {props.name}</p>

            <input type='text' onChange= {props.changed}  value={props.name}/>
            <Button 
            className='btns' buttonStyle='btn--primary'
            buttonSize='btn--large'>
                Search
            </Button>
        </div>
        
    )
}

export default searchbar;