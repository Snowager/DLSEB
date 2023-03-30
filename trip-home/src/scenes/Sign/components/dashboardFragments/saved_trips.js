import React, { useEffect, useState } from "react"
import {useQuery, useLazyQuery, cache} from '@apollo/client';
import {GET_TRIP_BY_USER_ID, GET_TRIP_USER_BY_EMAIL, GET_IN_TRIP_BY_TRIP} from "../../../TestingDatabase/GraphQL/queries.js"

const Saved_trips = (props) => {
    const [user_id, setUser_id] =                   useState("");
    const [status, setStatus] =                     useState("loading");
    const [trip_status, setTrip_status] =   useState("loading");
    const [in_trips, setIn_trips] = useState([]);
    const email = props.email
    const [i, setI] = useState(0);

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
        //console.log(user_data)
        setUser_id(user_data.trip_user[0].user_id)
      }
    }, [status])

    //finds all the items in the trips table that have a given user_id
    const [get_trips, {loading: trip_loading, error: trip_error, data: trip_data}] = useLazyQuery(GET_TRIP_BY_USER_ID)

    //finds all the items in the in_trip table that have a given trip_id
    const [get_in_trips, {loading: in_trip_loading, error: in_trip_error, data: in_trip_data}] = useLazyQuery(GET_IN_TRIP_BY_TRIP)
   
    //once the user_id is changed to an actual id in db, run the above query
    useEffect(() => {
      if(user_id !== ""){
        get_trips({variables: {user_id: user_id}, onCompleted: setTrip_status("complete")})
      }
    }, [user_id])

    //once the above query has finished, grab all items in the returned list
    useEffect(() => {
      if((trip_status === "complete" || trip_status === "complete_2") && trip_data !== undefined){        
        console.log(trip_data)
      }
      if(trip_status === "loading"){
        console.log("just wait")
      }
      else{
        console.log("reached else")
        setTrip_status("loading")
        get_trips({variables: {user_id: user_id}, onCompleted: setTrip_status("complete_2")})
      }
    }, [trip_status])

    useEffect(() => {
      if(trip_data) get_in_trips({variables: {trip_id: trip_data.trip[0].trip_id}, onCompleted: console.log("got data for " + trip_data.trip[i].trip_id)})
    }, [trip_data])

    useEffect(() => {
      if(in_trip_data !==  undefined){
        in_trips[i] = in_trip_data.in_trip
        setI(i + 1)
      }
    }, [in_trip_data])

    useEffect(() => {
      if(trip_data !== undefined && i < trip_data.trip.length){
        get_in_trips({variables: {trip_id: trip_data.trip[i].trip_id}, onCompleted: (console.log("got data for " + trip_data.trip[i].trip_id))})
      }
    }, [i])
    
    
    if(trip_loading || in_trip_loading) return  <div> loading, please hold </div>
    if(trip_error || in_trip_error) return    <div> {`Error! ${user_error.message}`}</div>
    if(trip_data && trip_data !== undefined){
        return (
            <div>
                {
                    trip_data.trip.map(trip => (
                        <div key={trip.trip_id}>
                            <h1>Trip in {trip.city}</h1>
                        </div>
                    ))
                }
                {
                  in_trips.map(item => (
                    <div key = {item[0].id}>
                      <h2>in_trip for {item[0].loc_name}</h2>
                      {item[1] ? (<div> and {item[1].loc_name} </div>): null}
                    </div>
                  ))
                  }
            </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_trips;