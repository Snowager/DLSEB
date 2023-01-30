import React, { useState } from 'react'
import MapContainer from '../containers/MapContainer';

const CitiesList = (props) => {

    const [map, setMap] = useState(false)
    const [lat, setLat] = useState(0)
    const [lng, setLng] = useState(0)

    const handleChange = (lat, lng) => {
        setMap(!map)
        setLat(lat)
        setLng(lng)
        //console.log(lat)
    }




    return (
        <>
            {props.cityList.map((city, index) => {
                if (city) {
                    
                    return (
                        <div><button key={index} type='button' onClick={() => handleChange(city.lat, city.lng)}>{city.city}, {city.state_name}</button></div>
                        )
                }
            })} <MapContainer lat={lat} lng={lng} status={map} zoom={10} />
        </>
    );
}

export default CitiesList;
