import React, { useEffect, useState } from "react"
import {useQuery, useLazyQuery} from '@apollo/client';
import {GET_SAVED_ACTIVITY_BY_USER, GET_TRIP_USER_BY_EMAIL} from "../../../TestingDatabase/GraphQL/queries.js"

const Saved_activities = (props) => {
    const [user_id, setUser_id] =                   useState("");
    const [status, setStatus] =                     useState("loading");
    const [activity_status, setActivity_status] =   useState("loading");
    const [activities, setActivities] =             useState([]);
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
      if(status == "complete"){
        console.log(user_data)
        setUser_id(user_data.trip_user[0].user_id)
      }
    }, [status])

    //finds all the items in the saved activities table that have a given user_id
    const [get_activities, {loading: activity_loading, error: activity_error, data: activity_data}] = useLazyQuery(GET_SAVED_ACTIVITY_BY_USER)
   
    //once the user_id is changed to an actual id in db, run the above query
    useEffect(() => {
      if(user_id != ""){
        get_activities({variables: {user_id: 1}, onCompleted: setActivity_status("complete"), pollInterval: 10000})
      }
    }, [user_id])

    //once the above query has finished, grab all items in the returned list
    useEffect(() => {
      if(activity_status == "complete"){
        console.log("activity data")
        console.log("here be the user id " + user_id)
        console.log(activity_data)
        setActivities(activity_data.saved_activity)
      }
    }, [activity_status])
    
    
    if(activity_loading) return  <div> loading, please hold </div>
    if(activity_error) return    <div> {`Error! ${user_error.message}`}</div>
    if(activity_data && activity_data.saved_activity.length != 0){
        console.log("email: " + email)

        return (
            <div>{
                activities.map(activity => (
                    <>
                        <h1>{activity.name}</h1>
                        <h2>lat: {activity.lat} || lng: {activity.lng}</h2>
                    </>
                ))
                }

            </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_activities;