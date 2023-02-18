import React, { useEffect, useState } from "react";
import {useMutation, useQuery, useLazyQuery} from '@apollo/client';
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
        console.log(charactersLength + "is the length")
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }
    setTrip_id(makeid(Math.random() * 12 + 6));
    
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
        if(trip_id != null){
            new_trip();
            for(const item in trip_list){
                setTrip_item(item);
                new_in_trip();
            }
        }
    }
    return(
    <button disabled={status=="loading"} onClick={onClick}> Save Trip </button>
    )
}

export default Save_trip_button;
