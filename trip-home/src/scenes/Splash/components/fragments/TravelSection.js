import React, {Component}from 'react';
import'../styles/TravelSection.css';
import SearchBar from '../../../MapCole/components/fragments/searchBar';


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
          "placeholder for buttons"
        </div>
        <div class="container text-center mt-4">
                <div class="row">
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Food </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Activities </a>
                    </div>
                    <div class="col-md-4">
                        <a href="https://stackoverflow.com/questions/32974967/how-to-change-shape-of-bootstrap-button" class="btn rounded-3 bg-white fw-bold px-4 node-choices-font my-2" role="button"> Stay </a>
                    </div>
                </div>
                </div>
    </div>
  )
}
}
export default TravelSection