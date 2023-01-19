import React, { useState } from 'react'
import MapContainer from '../MapContainer';

const CitiesList = (props) => {

    const [map, setMap] = useState(false)



    return (
        <>
            {props.cityList.map((city, index) => {
                if (city) {
                    
                    return (
                        <button key={index} type='button' onClick={() => setMap(!map)}>{city}</button>)
                }
            })} <MapContainer lat={40} lng={70} status={map} />
        </>
    );
}

export default CitiesList;
