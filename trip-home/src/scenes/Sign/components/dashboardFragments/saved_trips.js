import React, { useEffect, useState } from "react"
import {useQuery, useLazyQuery, cache} from '@apollo/client';
import {GET_TRIP_BY_USER_ID, GET_TRIP_USER_BY_EMAIL, GET_IN_TRIP_BY_TRIP} from "../../../TestingDatabase/GraphQL/queries.js"
import { Link } from 'react-router-dom';

const Saved_trips = (props) => {
    const [user_id, setUser_id] =                   useState("");
    const [status, setStatus] =                     useState("loading");
    const [trip_status, setTrip_status] =   useState("loading");
    const [in_trips, setIn_trips] = useState([]);
    const email = props.email
    const [i, setI] = useState(0);
    const [trips, setTrips] = useState([]);
    const [flag, setFlag] = useState(false);
    const [drop_value, setDrop_value] = React.useState("Choose...");
    const [selected, setSelected] = useState("");

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

    //grabs in_trip information as soon as the trips are loaded
    useEffect(() => {
      if(trip_data !== undefined && trip_data.trip[0].trip_id) get_in_trips({variables: {trip_id: trip_data.trip[0].trip_id}, onCompleted: console.log("got data for " + trip_data.trip[0].trip_id)})
    }, [trip_data])
 
    //puts in_trip info into the in_trips list and updates I
    useEffect(() => {
      if(in_trip_data !==  undefined){
        in_trips[i] = in_trip_data.in_trip
        setI(i + 1)
      }
    }, [in_trip_data])

    //Once the in_trip list is updated, get more in_trips for the rest of the objects in trips
    useEffect(() => {
      if(trip_data !== undefined && i < trip_data.trip.length){
        get_in_trips({variables: {trip_id: trip_data.trip[i].trip_id}, onCompleted: (console.log("got data for " + trip_data.trip[i].trip_id))})
      }
      else if(trip_data !== undefined && i >= trip_data.trip.length){setFlag(true)}
    }, [i])

    //changes the value of the drop down menu and sets the correct information in the "selected" object
    const handleChange = (event) => {
      setDrop_value(event.target.value);
      if(event.target.value !== "Choose..."){
        var num = parseInt(event.target.value.split("_")[1])
        setSelected({id: event.target.value.split("_")[0],
          num: num,
          trip: trip_data.trip[num],
          in_trips: in_trips[num],
          lat: parseFloat(event.target.value.split("_")[2]),
          lng: parseFloat(event.target.value.split("_")[3])
        });
      }
      console.log(drop_value)
    };


    const pushType = (type) => {
      selected.type = type
      selected.trip_flag = true
  }
    
    
    if(trip_loading || in_trip_loading) return  <div> loading, please hold </div>
    if(trip_error || in_trip_error) return    <div> {`Error! ${user_error.message}`}</div>
    if(trip_data && trip_data !== undefined && flag){
        return (
            <div key="saved_trips">
              <label> Saved trips
                <select value={drop_value} onChange={handleChange}>
                  <option value={"Choose..."} className='btn btn-light'> Choose... </option>
                  {
                    trip_data.trip.map(trip => (
                      <option value={trip.trip_id + "_" + trip_data.trip.indexOf(trip) + "_" + in_trips[trip_data.trip.indexOf(trip)][0].lat + "_" + in_trips[trip_data.trip.indexOf(trip)][0].lng}>
                        <p>Trip in {trip.city} starting at {in_trips[trip_data.trip.indexOf(trip)][0].loc_name}</p>
                        {in_trips[trip_data.trip.indexOf(trip)][in_trips[trip_data.trip.indexOf(trip)].length - 1] !== in_trips[trip_data.trip.indexOf(trip)][0]? 
                        (<p> and ending at {in_trips[trip_data.trip.indexOf(trip)][in_trips[trip_data.trip.indexOf(trip)].length - 1].loc_name}</p>) : null}
                      </option>
                    ))
                  }
                </select>
                <Link
                    to={`../MapPage/${selected.id}/${selected.lat}/${selected.lng}`}
                    //className='btn btn-light'
                    onClick={() => pushType(drop_value)}
                    state={selected}>
                      <button disabled={drop_value === "Choose..."}>
                        Load this trip
                    </button>
                </Link>
              </label>
            </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_trips;