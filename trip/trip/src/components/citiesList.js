import React from 'react'

const CitiesList = ({ cityList = [] }) => {



    return (
        <>
            {cityList.map((city, index) => {
                if (city) {
                    return (
                        <div key={index} className="box">{city}</div>)
                }
                return null
            })}
        </>
    );
}

export default CitiesList;
