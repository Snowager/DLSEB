import React, { useEffect, useState } from "react"
import {useQuery} from '@apollo/client';
import {GET_SAVED_ACTIVITY_BY_USER, GET_TRIP_USER_BY_EMAIL} from "../../../TestingDatabase/GraphQL/queries.js"

const Saved_activities = (props) => {
    const [user_id, setUser_id] = useState("");
    const email = props.email

    //finds the trip user with the given email 
    const [loading, error, data] = useQuery(GET_TRIP_USER_BY_EMAIL, {
        variables: {email: email}
    })


    return (
        <div> hello </div>
    )
}
export default Saved_activities;