import React, { useEffect, useState } from "react";
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
import {CREATE_TRIP, CREATE_IN_TRIP_DB, CREATE_IN_TRIP_GOOGLE} from "../../../TestingDatabase/GraphQL/inserts.js";
import {GET_TRIP} from "../../../TestingDatabase/GraphQL/queries.js";

const Save_trip_button = (props) => {
    const [trip_id, setTrip_id] = useState("");
    const [trip_list, setTrip_list] = useState([]);
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

    //adds the most recent trip_id to the trip_list
    const update_list = () => {
        setTrip_list([...trip_list, trip_id])
    }

    //creates a function (new_trip) that pushes a new trip entry to the database
    //Also calls the update_list function once the mutation has successfully been commited to the db with no errors
    const [new_trip, trip_loading, trip_error, trip_data] = useMutation(CREATE_TRIP, {
        onCompleted: update_list
    })

    //creates a function (new_in_trip) that pushes a new in_trip entry to the database
    const [new_in_trip, in_trip_loading, in_trip_error] = useMutation(CREATE_IN_TRIP_DB)
    
    //pushes a new trip entry every time the trip_id variable is updated
    useEffect(() => {
        console.log("trip_id: " + trip_id);
        if(trip_id != ""){
            console.log("pushing new trip to db")
            new_trip({variables:{
                city:       props.city,
                user_id:    props.id,
                trip_id:    trip_id,
                duration:   props.trip.length
            }})
        }
    }, [trip_id])

    //pushes new entries for in_trip everytime the trip_list array is updated
    useEffect(() => {
        if(props.trip != 0){
            console.log("adding items to trip")
            for(const item in props.trip){
                console.log("Adding " + props.trip[item].name + " to the db")
                console.log("with trip_id:  " + trip_id)
                new_in_trip({ 
                    variables: {
                        service_id: null,
                        trip_id:    trip_id,
                        lat:        props.trip[item].geometry.location.lat().toString(),
                        lng:        props.trip[item].geometry.location.lng().toString(),
                        loc_name:   props.trip[item].name
                    }
                })
                console.log("props lat:" + props.trip[item].geometry.location.lat() + "props lng:" + props.trip[item].geometry.location.lng())
            }
        }
    }, [trip_list])
    
    //changes the trip_id every time the button is pressed
    const onClick = () => {
        setTrip_id(makeid(Math.random() * 12 + 6));
    }

    return(
        <>
            <button disabled={status=="loading"} onClick={onClick}> Save Trip </button>
        </>
    )
}

export default Save_trip_button;
