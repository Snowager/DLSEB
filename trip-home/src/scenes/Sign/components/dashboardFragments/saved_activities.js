import React, { useEffect, useState } from "react"
import {useQuery, useLazyQuery} from '@apollo/client';
import {GET_SAVED_ACTIVITY, GET_TRIP_USER_BY_EMAIL} from "../../../TestingDatabase/GraphQL/queries.js"
import { Link } from 'react-router-dom';

const Saved_activities = (props) => {
    const [user_id, setUser_id] =                   useState("");
    const [status, setStatus] =                     useState("loading");
    const [activity_status, setActivity_status] =   useState("loading");
    const [activities, setActivities] =             useState([]);
    const email = props.email
    const [drop_value, setDrop_value] = React.useState("");
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
        console.log(user_data)
        setUser_id(user_data.trip_user[0].user_id)
      }
    }, [status])

    //finds all the items in the saved activities table that have a given user_id
    const [get_activities, {loading: activity_loading, error: activity_error, data: activity_data}] = useLazyQuery(GET_SAVED_ACTIVITY)
   
    //once the user_id is changed to an actual id in db, run the above query
    useEffect(() => {
      if(user_id !== ""){
        get_activities({variables: {user_id: user_id}, onCompleted: setActivity_status("complete")})
      }
    }, [user_id])

    //once the above query has finished, grab all items in the returned list
    useEffect(() => {
      console.log("activity status use effect")
      if(activity_status === "complete" && activity_data !== undefined){        
        console.log(activity_data)
        setActivities(activity_data.saved_activity)
      }
      if(activity_status === "loading"){
        console.log("just wait")
      }
      else{
        setActivity_status("loading")
        get_activities({variables: {user_id: user_id}, onCompleted: setActivity_status("complete")})
      }
    }, [activity_status])

    const handleChange = (event) => {
      setDrop_value(event.target.value);
      setSelected({name: event.target.value.split("_")[0],
      lat: event.target.value.split("_")[1],
      lng: event.target.value.split("_")[2]
    });
      console.log(drop_value)
    };

    const pushType = (type) => {
      selected.type = type
      selected.flag = true
  }
    
    if(activity_loading) return  <div> loading, please hold </div>
    if(activity_error) return    <div> {`Error! ${user_error.message}`}</div>
    if(activity_data && activity_data !== undefined){
        console.log("email: " + email)
        return (
            <div>
                <label> Saved activities
                    <select value={drop_value} onChange={handleChange}>
                {
                  
                    activity_data.saved_activity.map(activity => (
                      <option value={activity.name + "_" + activity.lat + "_" + activity.lng} 
                        className='btn btn-light'>
                        {activity.name} at lat: {activity.lat} || lng: {activity.lng}
                      </option>
                    ))
                }
                </select>
                <Link
                    to={`../MapPage/${selected.name}/${selected.lat}/${selected.lng}`}
                    className='btn btn-light'
                    onClick={() => pushType({drop_value})}
                    state={selected}>
                    start a trip with this location
                </Link>
                </label>
            </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_activities;