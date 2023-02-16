import React, { useEffect, useState } from "react";
import {useMutation, useQuery} from '@apollo/client';
import {CREATE_TRIP, CREATE_IN_TRIP_DB, CREATE_IN_TRIP_GOOGLE} from "../../../TestingDatabase/GraphQL/inserts.js";
import {GET_TRIP} from "../../../TestingDatabase/GraphQL/queries.js";


const Save_trip_button = (props) => {

    const [trip_id, setTrip_id] = useState("");
    const trip_list = props.trip;
    const [trip_item, setTrip_item] = useState("");
    const [status, setStatus] = useState("");
    
    //used for making a random trip_id 
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    //function that runs a query to check if the trip_id appears in the database
    const Trip_id_in_db = id => {
        const {loading, error, data} = useQuery(GET_TRIP, {
            variables: {
                trip_id: id
            }
        });

        if (loading) {
            console.log("loading")
            setStatus("loading")
        }
        if (error) {
            console.log(`Error! ${error.message}`)
            return `Error! ${error.message}`
        }
        if(data && data.trip_by_pk != null){
            console.log("found trip_id: " + id + " in the database")
            return true;
        }
        return false;
    };

    //while loop that assigns trip_id a new value until it creates one that isn't already in the database
    do{setTrip_id(makeid(Math.random() * 12));}while(Trip_id_in_db(trip_id));

    //pushes a new trip entry to the database
    const [new_trip, trip_loading, trip_error, trip_data] = useMutation(CREATE_TRIP, {
        variables:{
            city:       props.city,
            user_id:    props.user_id,
            trip_id:    trip_id,
            duration:   trip_list.length
        }
    })

    //pushes a new in_trip entry to the database
    const [new_in_trip, in_trip_loading, in_trip_error] = useMutation(CREATE_IN_TRIP_DB, {
        variables: {
            id:         trip_item.id,
            trip_id:    trip_id,
            lat:        trip_item.lat,
            lng:        trip_item.lng
        }
    })

    const onClick = () => {
        new_trip();
        for(const item in trip_list){
            setTrip_item(item);
            new_in_trip();
        }
    }

    return <button onClick={onClick}> Save Trip </button>
}

export default Save_trip_button;