import React, { useEffect, useState } from "react"
import {useQuery} from '@apollo/client';
import {GET_SAVED_ACTIVITY_BY_USER, GET_TRIP_USER_BY_EMAIL} from "../../../TestingDatabase/GraphQL/queries.js"

const Saved_activities = (props) => {
    const [user_id, setUser_id] =   useState("");
    const [status, setStatus] =     useState("loading");
    const email = props.email

    //changes status when the query completes without error
    const update_status = () => {
        setStatus("complete")
    }

    //finds the trip user with the given email 
    const {loading, error, data} = useQuery(GET_TRIP_USER_BY_EMAIL, {
        variables: {email: email},
        onCompleted: update_status 
    })

    //grabs the user id from the only item in the query
    useEffect(() => {
      if(status == "complete"){
        console.log(data)
        setUser_id(data.trip_user[0].user_id)
      }
    }, [status])
    
    
    if(loading) return  <div> loading, please hold </div>
    if(error) return    <div> {`Error! ${error.message}`}</div>
    if(data && data.trip_user != 0){
        console.log("email: " + email)

        return (
            <div>{user_id}  </div>
        )
    }
    return <div> something else happened </div>
}
export default Saved_activities;