import { useLoadScript } from "@react-google-maps/api";
import '../../../Home/pages/styles/search_bar.css';
import '../../../Splash/components/styles/button.css';
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import "@reach/combobox/styles.css";


const PlacesAutocomplete = ({ setSelected }) => {

    // calls "usePlacesAutocomplete" hook
    const {
        // checks if script is loaded
        ready,
        value,
        setValue,
        // if the results were feteched correctly the data(suggestions) are displayed
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    // async function because were converting the address selected in the search bar into lat/lng coordinates
    const handleSelect = async (address) => {
        // set false because no additional data is needed to be fetched
        setValue(address, false);
        //clears the suggestions once one of the options is selected
        clearSuggestions();

        // uses getGeocode/getLatLng to convert the address into lat/lng coordinates
        const results = await getGeocode({ address });
        console.log(results[0])
        const { lat, lng } = await getLatLng(results[0]);

        const cityName = results[0].address_components[0].long_name
        const stateName = results[0].address_components[2].short_name

        // passes lat/lng so it can be used as the center to load the map
        setSelected({ lat, lng, cityName, stateName });
    };

    return (
        <Combobox onSelect={handleSelect}>
            <ComboboxInput
                value={value}
                //tracks what the user types and passes it into the search bar 
                onChange={(e) => setValue(e.target.value)}
                // disables search bar until its ready to track input
                disabled={!ready}
                className="combobox-input"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {/* // if staus is okay it displays data suggestions */}
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

// creates a switch slider that allows the user to use their current location for the map
const ControlledSwitches = ({ setSelected }) => {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        // tracks whether the switch is checked or unchecked
        setChecked(event.target.checked);

        // if switch is ckecked geolocation gets the users lat/lng and logs it
        if (checked == false) {
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);

                // users lat/lng is "setSelected" so it can be used as the center to load the map
                setSelected({ lat: position.coords.latitude, lng: position.coords.longitude });

            });
        }
    };

    return (
        <>
            <div>
                <p>Switch to Use Your Location</p>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                />
            </div>
        </>
    );
}



function MapSearchBar() {
    const [selected, setSelected] = useState(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCbEViNtWBZefKVLluU-rWvH4fVKYz5Uuk",
        // loads places and their addresses from google maps script
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
                <ControlledSwitches setSelected={setSelected} />
            </div>

            <div className="places-container mx-auto">
                <Link
                    to={`MapPage/restaurant/${setSelected.lat}/${setSelected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("restaurant")}
                    state={selected}>
                    Food
                </Link>
                <Link
                    to={`MapPage/hotel/${setSelected.lat}/${setSelected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("hotel")}
                    state={selected}>
                    Hotel
                </Link>
                <Link
                    to={`MapPage/activity/${setSelected.lat}/${setSelected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType("fun")}
                    state={selected}>
                    Activity
                </Link>
            </div>
        </>
    );
};

export default MapSearchBar;

