import React, {Component}from 'react';
import {Button} from './Button';
import'./TravelSection.css';
import'../App.css';
import SearchBar from './SearchBar';


class TravelSection extends Component {

    state = { 
        locations: [
        { name : 'Enter Location' }
    ]}

    nameChangedHandler = (event) => {
      this.setState({locations: [
        { name : event.target.value }
      ]})
    }
  
    render(){ 
      
  
  return (
    <div className='travel-continer'>
        <SearchBar
        name ={this.state.locations[0].name}
        changed={this.nameChangedHandler}> 
        </SearchBar>
        <div className="travel-btns">
        </div>
    </div>
  )
}
}
export default TravelSection