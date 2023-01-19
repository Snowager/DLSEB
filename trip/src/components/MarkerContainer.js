import React, {useState, useEffect, useRef} from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import InfoWindowContainer from "./InfoWindowContainer"

const MarkerContainer = (props) => {

    const [ selected, setSelected ] = useState({});

    var infoWindow = false;

    const onSelect = item => {
        console.log("working")
        setSelected(item)
        infoWindow = (!infoWindow);
        console.log(infoWindow);
    }

    return(
        <>
        <Marker 
        position = {props.position}
        key = {props.name}
        onClick = {() => onSelect()}
        /> 
    </>
    )

}

export default MarkerContainer;