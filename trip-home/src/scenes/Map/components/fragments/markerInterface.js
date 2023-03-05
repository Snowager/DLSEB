import {React, useState } from 'react'
import { Marker, } from '@react-google-maps/api';
import MarkerStyle from '../../images/markerTemplate4.svg'
import MarkerWindow from "../fragments/markerWindow"

/*

The Marker Interface is an intermediate layer that handles rendering markers and infowindows for markers.

Passed a list of locations, markers, the selected marker, and google.window to generate google objects
*/

const MarkerInterface = (props) => {


    const icon = {
        url: MarkerStyle, // url
        scaledSize: new props.google.maps.Size(50, 50), // scaled size
        origin: new props.google.maps.Point(0, 0), // origin
        anchor: new props.google.maps.Point(0, 0) // anchor
    };


    return (
        <div>
            {
                props.places &&
                (
                    ({/* Marker options. Needs a key and position to display on map. position is lat/lng coords */ }),
                    props.markers.map(places => (
                        <Marker
                            icon={icon}

                            key={places.place_id}
                            position={places.geometry.location}
                            onClick={() => {
                                props.setSelected(places)
                            }} />
                    )
                    )
                )
            }

            {/*another conditional function for the infoWindow. Checks for marker existence to display, closes by changing the selected object back to null*/}
            {props.selected ?
                <MarkerWindow
                    selected={props.selected}
                    todos={props.todos}
                    onClose={() => props.setSelected(null)}
                    setTodos={props.setTodos}
                    onClick={() => props.setOpen(!props.open)}

                /> : null}
        </div>
    )
}

export default MarkerInterface