import React, {useState, useEffect, useRef} from 'react';
import ReactDOM, { createRoot } from "react-dom/client";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const InfoWindowContainer = (props) => {

    console.log("loaded");

    const [selected, setSelected ] = useState(true);

    return(
        <InfoWindow 
        position={props.position}
        clickable={true}
        onCloseClick={() => setSelected({})}
        >
            { console.log("not happening") }
            <>
                <h1>{props.name}</h1>
                <h2>{props.desc}</h2>
            </>
        </InfoWindow>
    )
}

export default InfoWindowContainer;