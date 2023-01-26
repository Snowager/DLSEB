import React, { useEffect, useState } from 'react'
import axios from "axios"
import CitiesList from "../../components/fragments/citiesList.js"

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