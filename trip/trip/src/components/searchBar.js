import React, { useEffect, useState } from 'react'
import axios from "axios"
import CitiesList from "./citiesList"

const SearchBar = () => {

  const [searchInput, setSearchInput] = useState("");

  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get("city_info2.JSON")
    .then((res) => setCities(res.data))
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
      else if (location.city.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 4) {
        return location.city.toLowerCase().includes(searchInput.toLowerCase());
        
      }
    })

  return <div>

    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />

    <div>
      <CitiesList cityList={filteredData}/>
    </div>

  </div>


};

export default SearchBar;