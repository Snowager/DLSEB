import React, { useEffect, useState } from "react";
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
import {CREATE_TRIP, CREATE_IN_TRIP_DB, CREATE_IN_TRIP_GOOGLE} from "../../../TestingDatabase/GraphQL/inserts.js";
import {GET_TRIP} from "../../../TestingDatabase/GraphQL/queries.js";

const Save_trip_button = (props) => {
    const dummyItem = {
        geometry: {
            location: {
                lat: function (){return 1},
                lng: function (){return 1}
            }
        }
    }
    const [trip_id, setTrip_id] = useState("");
    const [trip_list, setTrip_list] = useState([]);
    const [trip_item, setTrip_item] = useState(dummyItem);
    const [status, setStatus] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    
    //used for making a random trip_id 
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    //creates a function (new_trip) that pushes a new trip entry to the database
    const [new_trip, trip_loading, trip_error, trip_data] = useMutation(CREATE_TRIP)
    
    //pushes a new trip entry every time the trip_id variable is updated
    useEffect(() => {
        console.log("trip_id: " + trip_id);
        if(trip_id != null){
            new_trip({variables:{
                city:       props.city,
                user_id:    props.id,
                trip_id:    trip_id,
                duration:   props.trip.length
            }});
        }
    }, [trip_id])
    
    //pushes a new in_trip entry to the database
    const [new_in_trip, in_trip_loading, in_trip_error] = useMutation(CREATE_IN_TRIP_DB)

    const onClick = () => {
        setTrip_id(makeid(Math.random() * 12 + 6));
        if(props.trip != 0){
            if(trip_id != null){
                for(const item in props.trip){
                    new_in_trip({ 
                        variables: {
                            service_id: null,
                            trip_id:    trip_id,
                            lat:        props.trip[item].geometry.location.lat().toString(),
                            lng:        props.trip[item].geometry.location.lng().toString()
                        }
                    })
                    console.log("props lat:" + props.trip[item].geometry.location.lat())
                    console.log("props lng:" + props.trip[item].geometry.location.lng())
                }
            }
        }
        else{
            console.log("Nothing in the props list");
        }
    }

    return(
        <>
            <button disabled={status=="loading"} onClick={onClick}> Save Trip </button>
        </>
    )
}

export default Save_trip_button;
