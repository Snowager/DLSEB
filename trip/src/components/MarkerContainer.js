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

    const showWindow = () => {
        if(infoWindow) {
            return(
                <div style={{zIndex: "10000000"}}>
                <InfoWindow 
                position = {props.position}
                >
                    <h1> poopY</h1>
                </InfoWindow>
                {/*<InfoWindowContainer position = {props.position} name= {props.name} desc = {props.desc} />*/}
            </div>
            )
        }
        else{
            console.log("you fucked it");
        }
    }

    return(
        <>
        <Marker 
        position = {props.position}
        key = {props.name}
        onClick = {() => onSelect()}
        /> 
        <>
            <showWindow />
        </>
    </>
    )

}

export default MarkerContainer;