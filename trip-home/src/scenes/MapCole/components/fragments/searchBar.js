import React, { useEffect, useState } from 'react'
import axios from "axios"
import CitiesList from "../fragments/citiesList"
import '../styles/searchbar.css';
import MapContainer from '../containers/MapContainer';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

  const [searchInput, setSearchInput] = useState("");

  const [cities, setCities] = useState([]);
  const [city, setCity] = useState([]);

  const [value, setValue] = useState("");
  const [map, setMap] = useState(false)

  

  const ListhandleChange = (city) => {
      setMap(!map)
      setCity(city)

      setValue(city.city + ", " + city.state_name)
      }

  const pushType = (type) => {
    city.type = type
  }

  useEffect(() => {
    axios.get("/static/files/city_info2.JSON")
    .then((res) => setCities(res.data))
    .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value)
    setValue(e.target.value)
    
  };

  

  let count = 0

  const filteredData =
    Object.values(cities).filter((location) => {
      
      if (searchInput == "") {
        count = 0
        
        return 
      }
      else if (location.city.toLowerCase() == searchInput) {
        return location.city
        
      }
      else if ((location.city.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 2)) {
        while (count < 5) {
          count++
          return location.city.toLowerCase().includes(searchInput.toLowerCase());
        }
      }
      else if ((location.state_name.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 2)) {
        while (count < 5) {
          count++
        return location.state_name.toLowerCase().includes(searchInput.toLowerCase());
        }
      }
      return
    })

  return <>
  
      <input
      className = "HomeSearch"
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={value} 
      />

    <div>
      {filteredData.map((city, index) => {
                if (city) {
                  return (
                      <div><button className= "HomeList" key={index} type='button' onClick={() => {
                          ListhandleChange(city) 
                          } }>{city.city}, {city.state_name}</button>
                      </div>
                        )
                }
            })}
    </div>
{/*
    <h1>{cty}  {ste}</h1> 
    <MapContainer lat={lat} lng={lng} status={map} zoom={10} />
*/}

    <Link 
    to={`MapPage/hotel/${city.city}/${city.state_name}`} 
    className='btns'
    onClick={() => pushType("hotel")}
    state={city}>
      Hotel
    </Link>
    <Link 
    to={`MapPage/activity/${city.city}/${city.state_name}`}
    className='btns'
    onClick={() => pushType("activity")}
    state={city}
    >
      Activity
    </Link>
    <Link 
    to={
      {pathname: `MapPage/restaurant/${city.city}/${city.state_name}`
  }
}
    className='btns'
    onClick={() => pushType("restaurant")}
    state={city}> 
    {/*
    state={{ type: {cty} }}> //Passing objects through links gives an error. Needs to be saved as an array. WIP
    */}
      Resturant
    </Link>
  </>


};

export default SearchBar;