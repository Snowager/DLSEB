import React, { useState } from 'react'
import MapContainer from '../../components/containers/MapContainer.js';
const CitiesList = (props) => {

    const [map, setMap] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)
    const [cty, setCty] = useState()
    const [ste, setSte] = useState()

    const handleChange = (lat, lng, cty, ste) => {
        setMap(!map)
        setLat(lat)
        setLng(lng)
        setCty(cty)
        setSte(ste)
        console.log(lat)
    }




    return (
        <>
            <h1>{cty}  {ste}</h1> 
            {props.cityList.map((city, index) => {
                if (city) {

                    return (
<<<<<<< HEAD
                        <div><button key={index} type='button' onClick={() => handleChange(city.lat, city.lng)}>{city.city}, {city.state_name}</button></div>
                    )
=======
                        <div><button className= "HomeList" key={index} type='button' onClick={() => handleChange(city.lat, city.lng, city.city, city.state_name)}>{city.city}, {city.state_name}</button></div>
                        )
>>>>>>> SearchBar
                }
            })} <MapContainer lat={lat} lng={lng} status={map} zoom={10} />
        </>
    );
}

export default CitiesList;
