import React, { useState } from 'react'

const SearchBar = () => {

  const [searchInput, setSearchInput] = useState("");

  const countries = [

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

  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(e.target.value)
  };

  const filteredData =
    countries.filter((country) => {
      if (searchInput == "") {
        return country
      }
      else if (country.continent.toLowerCase().includes(searchInput.toLowerCase())) {
        return country.continent.toLowerCase().includes(searchInput.toLowerCase());
      }
      else if (country.name.toLowerCase().includes(searchInput.toLowerCase())) {
        return country.name.toLowerCase().includes(searchInput.toLowerCase());
      }
    })

  return <div>

    <input
      type="search"
      placeholder="Search here"
      onChange={handleChange}
      value={searchInput} />

    <div>
      {filteredData.map((country, index) => (

        <div key={index} className="box">{country.name} {country.continent}</div>))}
    </div>

  </div>


};

export default SearchBar;