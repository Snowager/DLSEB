import React, {Component}from 'react';
import'../styles/TravelSection.css';
import SearchBar from '../../../MapCole/components/fragments/searchBar';
import Button from './Button';
import { Link } from 'react-router-dom';



const TravelSection = (props) => {

  return (
    <div className='travel-continer'>
        <SearchBar> </SearchBar>
       {/* <div className="travel-btns">
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            Resturants
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
            onClick={console.log('hey')}
          >
            Hotels
          </Button>
          <Button
            className='btns'
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            Activities
          </Button>
          <Link to="/map" className="btn--primary">Sign up</Link>
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
              */}
    </div>
  )
}

export default TravelSection