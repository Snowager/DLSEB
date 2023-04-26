import { useLoadScript } from "@react-google-maps/api";
import '../../../Home/pages/styles/search_bar.css';
import '../../../Splash/components/styles/button.css';
import fun_list from "../../../Map/components/fun.json";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';
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
                style={{ borderRadius: 10 }}
                className="combobox-input"
                placeholder="Enter a location"
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

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
            color: "#47BE43",
            '&:hover': {
                backgroundColor: alpha("#47BE43", theme.palette.action.hoverOpacity),
            },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: "#47BE43",
        },
    }));

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
            <div className="switch-rounded-bottom">
                Click to Use Your Location
                <GreenSwitch
                    checked={checked}
                    onChange={handleChange}
                    sx={{
                        color: 'white'
                    }}
                />
            </div>
        </>
    );
}



function MapSearchBar() {
    const [selected, setSelected] = useState(null);
    const [drop_value, setDrop_value] = React.useState('dinner_movie');

    const handleChange = (event) => {
        setDrop_value(event.target.value);
    };


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCbEViNtWBZefKVLluU-rWvH4fVKYz5Uuk",
        // loads places and their addresses from google maps script
        libraries: ["places"],
    });

    const pushType = (type) => {
        selected.type = type
    }


    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    if (!isLoaded) return
    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
                <ControlledSwitches setSelected={setSelected} />
            </div>


            {selected ? (
                <><div className="places-container mx-auto">
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
                </div>
                    <div class="PackageList">
                        <h3 class="text-light">Choose from our pre made packages!</h3>
                        <select value={drop_value} onChange={handleChange}>
                            <option value=""> </option>
                            <option value="restaurant_movie" >
                                Dinner and a Movie</option>
                            <option value="restaurant_park_movie" >
                                Family Day</option>
                            <option value="cabin_breakfast_park_outdoors_lunch_dinner_hotel_breakfast_hike_lunch_fun_dinner">
                                Weekend Vacation</option>
                            <option value="therapy_bar_arcade_moms-house_mcdonalds">
                                BOYS NIGHT </option>
                            <option value="gun_ulta_karaoke_museum_pottery" >
                                GIRLS NIGHT </option>
                            <option value="strip-club_hooters" >
                                Bachelor party in your 40's</option>
                            <option value="strip-club_wedding_divorce-attourney_planned-parrent-hood" >
                                Shot gun wedding </option>
                            <option value="panda-express_gym_gun-range" >
                                Nates package </option>
                            <option value="gym_petco_fish" >
                                Nikos package </option>
                            <option value="gym_DIA_Kilimanjaro_DIA_bike-path" >
                                Coles package </option>
                            <option value="appartment_bakery_hair-salon_cat-cafe_best-buy" >
                                Alexs package </option>
                            <option value="UNC_ulta_target_cava_starbucks_mcdonalds" >
                                Tiffany and Rachels package </option>
                            <option value="" > </option>

                        </select>
                        <Link
                            to={`MapPage/activity/${drop_value}/${selected.lat}/${selected.lng}`}
                            className='btn--outline'
                            onClick={() => (console.log(drop_value), pushType(drop_value))}
                            state={selected}>
                            Choose Package
                        </Link>
                    </div> </>)
                :

                <h1 class="PackageList ">
                    Enter a Location to Begin</h1>}


        </>
    );
};

export default MapSearchBar;

