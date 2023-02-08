import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import '../../../Home/pages/styles/Map.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address });
        console.log(results)
        const { lat, lng } = await getLatLng(results[0]);
        setSelected({ lat, lng });
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};



function MapSearchBar() {
    const center = useMemo(() => ({ lat: 40.4152, lng: -104.7706 }), []);
    const [selected, setSelected] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCbEViNtWBZefKVLluU-rWvH4fVKYz5Uuk",
        libraries: ["places"],
    });

    const pushType = (type) => {
        selected.type = type
    }

    if (!isLoaded) return <div>Loading...</div>
    return (
        <>
            <div class="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>

            <div>
                <Link
                    to={`MapPage/hotel/${setSelected.lat}/${setSelected.lng}`}
                    className='btns'
                    onClick={() => pushType("hotel")}
                    state={selected}>
                    Hotel
                </Link>
            </div>
        </>
    );
};

export default MapSearchBar;

