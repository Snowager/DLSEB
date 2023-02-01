import React, { useEffect, useState } from 'react'
import axios from "axios"
import CitiesList from "../fragments/citiesList"
import '../styles/searchbar.css';
import MapContainer from '../containers/MapContainer';
import { Link } from 'react-router-dom';

const SearchBar = (props) => {

  const [searchInput, setSearchInput] = useState("");

  const [cities, setCities] = useState([]);

  const [value, setValue] = useState("");
  const [map, setMap] = useState(false)
  const [lat, setLat] = useState(0)
  const [lng, setLng] = useState(0)
  const [cty, setCty] = useState()
  const [ste, setSte] = useState()

  const ListhandleChange = (lat, lng, cty, ste) => {
      setMap(!map)
      setLat(lat)
      setLng(lng)
      setCty(cty)
      setSte(ste)
      console.log(lat)
      setValue(cty,ste)  ;{/* only puts city in search bar. WIP*/}
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
                          ListhandleChange(city.lat, city.lng, city.city, city.state_name) 
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
    to="/MapPage" 
    className='btns'
    state={{ type: "Hotel" }}>
      Hotel
    </Link>
    <Link 
    to="/MapPage" 
    className='btns'
    state={{ type: "Activity" ,
            state: {ste}
    }}>
      Activity
    </Link>
    <Link 
    to="/MapPage" 
    className='btns'
    state={{ type: "Resturant" }}>
      Resturant
    </Link>
  </>


};

export default SearchBar;