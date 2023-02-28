import { useLoadScript } from "@react-google-maps/api";
import '../../../Home/pages/styles/search_bar.css';
import '../../../Splash/components/styles/button.css';
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
        console.log(results[0])
        const { lat, lng } = await getLatLng(results[0]);
        const cityName = results[0].address_components[0].long_name
        const stateName = results[0].address_components[2].short_name
        setSelected({ lat, lng, cityName, stateName });
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
    const dummyitem = {
        lat: 69,
        lng: 420,
        type: "yours ;)",
    }
    const [selected, setSelected] = useState(dummyitem);
    const [drop_value, setDrop_value] = React.useState('fruit');
    
    const handleChange = (event) => {
        setDrop_value(event.target.value);
    };


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
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
            </div>

            <div className="places-container mx-auto">
                <Link
                    to={`MapPage/restaurant/${selected.lat}/${selected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("restaurant")}
                    state={selected}>
                    Food
                </Link>
                <Link
                    to={`MapPage/hotel/${selected.lat}/${selected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("hotel")}
                    state={selected}>
                    Hotel
                </Link>
                <Link
                    to={`MapPage/activity/${selected.lat}/${selected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("fun")}
                    state={selected}>
                    Activity
                </Link>
                <label> Packages
                    <select value={drop_value} onChange={handleChange}>
                        <option value="dinner_movie" className='btn btn-light'> Dinner and a Movie</option>

                        <option value="family" className='btn btn-light'>         Family Day</option>

                        <option value="weekend_vacation" className='btn btn-light'>   Weekend Vacation</option>
                    </select>
                    <Link
                        to={`Package/${drop_value}/${selected.lat}/${selected.lng}`}
                        className='btn btn-light'
                        onClick={() => pushType("package")}
                        state={selected}>
                        Choose Package
                    </Link>
                </label>
            </div>
        </>
    );
};

export default MapSearchBar;

