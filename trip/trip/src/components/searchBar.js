import React, { useEffect, useState } from 'react'
import axios from "axios"
import CitiesList from "./citiesList"

const SearchBar = () => {

  const [searchInput, setSearchInput] = useState("");

  const [cities, setCities] = useState([])
  const [lat, setLat] = useState([])
  const [lng, setLng] = useState([])

  /*const countries = [

    { name: "Belgium", continent: "Europe" },
    { name: "India", continent: "Asia" },
    { name: "Bolivia", continent: "South America" },
    { name: "Ghana", continent: "Africa" },
    { name: "Japan", continent: "Asia" },
    { name: "Canada", continent: "North America" },
    { name: "New Zealand", continent: "Australasia" },
    { name: "Italy", continent: "Europe" },
    { name: "South Africa", continent: "Africa" },
    { name: "China", continent: "Asia" },
    { name: "Paraguay", continent: "South America" },
    { name: "Usa", continent: "North America" },
    { name: "France", continent: "Europe" },
    { name: "Botswana", continent: "Africa" },
    { name: "Spain", continent: "Europe" },
    { name: "Senegal", continent: "Africa" },
    { name: "Brazil", continent: "South America" },
    { name: "Denmark", continent: "Europe" },
    { name: "Mexico", continent: "South America" },
    { name: "Australia", continent: "Australasia" },
    { name: "Tanzania", continent: "Africa" },
    { name: "Bangladesh", continent: "Asia" },
    { name: "Portugal", continent: "Europe" },
    { name: "Pakistan", continent: "Asia" },

  ];*/

  useEffect(() => {
    axios.get("city_info.JSON")
    .then((res) => setCities(res.data.city))
    .then((res) => setLat(res.data.lat))
    .then((res) => setLng(res.city.lng))
    .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value)
  };



  const filteredData =
    Object.values(cities).filter((location) => {
      if (searchInput == "") {
        return
      }
      else if (location.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 4) {
        return location.toLowerCase().includes(searchInput.toLowerCase());
      }
    })

  return <div>

    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />

    <div>
      <CitiesList cityList={filteredData} />
    </div>

  </div>


};

export default SearchBar;