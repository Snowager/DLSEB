import React, { useState } from 'react';
import { InfoWindow, } from '@react-google-maps/api';
import "../../../Splash/components/styles/button.css"
import StarRatings from 'react-star-ratings';
import "../styles/map.css"

/*

The Marker Window is a custom infoWindow component that renders trip details for the user.

Passed the selected marker, and current todos (add to trip button modifies list)

*/

const MarkerWindow = (props) => {
    return (
        <>
        <InfoWindow
            position={props.selected.geometry.location}
            onCloseClick={() => {
                props.onClose()
            }}>
            {/* infoWindow can have one child div. Can still include other components inside the window via nesting and flex arrangement*/}
            <div>
                <div className='photoContainer card'>
                    {props.selected.photos ? <img src={props.selected.photos[0].getUrl()} alt={"picture of " + props.selected.name}></img> : null}

                    <div className="starContainer"><div className='star'><StarRatings
                        rating={props.selected.rating}
                        starRatedColor="purple"
                        starDimension="20px"
                        starSpacing="8px"
                    />
                    </div>
                        <span className="rating" style={{ color: "blue" }}>{props.selected.rating}
                        </span>
                    </div>
                    <p>ratings total: ({props.selected.user_ratings_total})</p>
                    <h4>
                        {props.selected.name} {props.selected.priceString ? "(" + props.selected.priceString + ")" : ""}
                    </h4>
                    <p>
                        {props.selected.formatted_address}
                    </p>
                    <button className='btn btn-dark'
                        onClick={() => {
                            props.setTodos(prevTodos => [...prevTodos, props.selected])
                            props.onClick()
                        }}>
                        Add to trip
                    </button>
                </div>
            </div>
        </InfoWindow>
        </>
    )
}

export default MarkerWindow;