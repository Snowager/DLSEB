import { useLoadScript } from "@react-google-maps/api";
import '../../../Home/pages/styles/search_bar.css';
import '../../../Splash/components/styles/button.css';
import fun_list from "../../../Map/components/fun.json";
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
                style={{ borderRadius: 10 }}
                className="combobox-input"
                placeholder="Enter a location"
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
    const [selected, setSelected] = useState(null);
    const [drop_value, setDrop_value] = React.useState('dinner_movie');

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

    
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    if (!isLoaded) return
    return (
        <>
            <div className="places-container">
                <PlacesAutocomplete setSelected={setSelected} />
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
                        onClick={() => pushType(fun_list.fun_list[getRandomInt(fun_list.fun_list.length - 1)])}
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

