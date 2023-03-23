import React, { useEffect, useState } from "react"
import {useQuery, useLazyQuery} from '@apollo/client';
import {GET_TRIP_BY_USER_ID, GET_TRIP_USER_BY_EMAIL} from "../../../TestingDatabase/GraphQL/queries.js"

const Saved_trips = (props) => {
    const [user_id, setUser_id] =                   useState("");
    const [status, setStatus] =                     useState("loading");
    const [trip_status, setTrip_status] =   useState("loading");
    const [trips, setTrips] =             useState([]);
    const email = props.email

    //changes status when the query completes without error
    const update_status = () => {
        setStatus("complete")
    }

    //finds the trip user with the given email 
    const {loading: user_loading, error: user_error, data: user_data} = useQuery(GET_TRIP_USER_BY_EMAIL, {
        variables: {email: email},
        onCompleted: update_status 
    })

    //grabs the user id from the only item in the get_trip_user query
    useEffect(() => {
      if(status === "complete"){
        console.log(user_data)
        setUser_id(user_data.trip_user[0].user_id)
      }
    }, [status])

    //finds all the items in the saved trips table that have a given user_id
    const [get_trips, {loading: trip_loading, error: trip_error, data: trip_data}] = useLazyQuery(GET_TRIP_BY_USER_ID)
   
    //once the user_id is changed to an actual id in db, run the above query
    useEffect(() => {
      if(user_id !== ""){
        get_trips({variables: {user_id: user_id}, onCompleted: setTrip_status("complete")})
      }
    }, [user_id])

    //once the above query has finished, grab all items in the returned list
    useEffect(() => {
      console.log("trip status use effect")
      if(trip_status === "complete" && trip_data !== undefined){        
        console.log(trip_data)
        setTrips(trip_data.trip)
      }
      if(trip_status === "loading"){
        console.log("just wait")
      }
      else{
        setTrip_status("loading")
        get_trips({variables: {user_id: user_id}, onCompleted: setTrip_status("complete")})
      }
    }, [trip_status])
    
    if(trip_loading) return  <div> loading, please hold </div>
    if(trip_error) return    <div> {`Error! ${user_error.message}`}</div>
    if(trip_data && trip_data !== undefined){
        console.log("email: " + email)
        return (
            <div>
                {
                    trip_data.trip.map(trip => (
                        <div key={trip.trip_id}>
                            <h1>Trip in {trip.city}</h1>
                        </div>
                    ))
                }
            </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_trips;