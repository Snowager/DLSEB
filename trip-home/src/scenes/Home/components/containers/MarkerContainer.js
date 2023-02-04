import React, { useState, useEffect, useRef } from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowContainer from "./InfoWindowContainer"

const MarkerContainer = (props) => {

    const [selected, setSelected] = useState({});
    const [infoWindow, setInfoWindow] = useState(false);

    const onSelect = item => {
        console.log("working")
        setSelected(item)
        setInfoWindow(!infoWindow)
        console.log(infoWindow);
    }

    const ShowWindow = () => {
        if (infoWindow) {
            return (
                <InfoWindowContainer name={props.name} position={props.position} desc={props.desc} />
            )
        }
        else {
            console.log("you fucked it");
        }
    }

    return (
        <>
            <Marker
                position={props.position}
                key={props.name}
                onClick={() => onSelect()}
            />
            <ShowWindow />
        </>
    )

}

export default MarkerContainer;