import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { CREATE_SAVED_ACTIVITY, REMOVE_SAVED_ACTIVITY } from "../../../TestingDatabase/GraphQL/inserts.js";
import { } from "../../../TestingDatabase/GraphQL/queries.js";
import user_data from "../../../TestingDatabase/pages/user.json";

const Save_activity_button = (props) => {
    const lat = props.lat.toString();
    const lng = props.lng.toString();
    const name = props.name;
    const id = user_data.id;
    const [saved, setSaved] = useState(false);
    const [state, setState] = useState(false);
    const [savedActivities, setSavedActivities] = useState(user_data.savedActivities);

    //Check if the activity is already saved, if it is set saved to true
    const isFound = savedActivities.some(element => {
        console.log(savedActivities);
        if (element === {lat: lat, lng: lng, name: name}) {
          return true;
        }
    
        return false;
      });
    useEffect(() => {
        if(isFound){setSaved(true)}
      }, []);

    const [create_activity, activity_loading, activity_error] = useMutation(CREATE_SAVED_ACTIVITY, {
        variables: {
            lat: lat,
            lng: lng,
            name: name,
            user_id: id
        }
    })

    const [delete_activity, delete_activity_loading, delete_activity_error] = useMutation(REMOVE_SAVED_ACTIVITY, {
        variables: {
            lat: lat,
            lng: lng,
            name: name,
            user_id: id
        }
    })

    useEffect(() => {
        if(state === false && isFound === true && saved === true){
            delete_activity();
            setSaved(false);
        }
        else if(state === true && isFound === false && saved === false){
            create_activity();
            setSavedActivities(prevSavedActivities => [...prevSavedActivities, {lat: lat, lng: lng, name: name}])
            setSaved(true);
        }
    }, [state])

    const handleClick = () => {
        if(saved === false && state === false){setState(true)}
        else if(saved === true && state === true){setState(false)}
    }

    useEffect(() => {
        user_data.savedActivities = savedActivities;
    }, [savedActivities])

    function deleteSavedActivities () {
        user_data.savedActivities = []
    }
    
    return (
        <>
        <button onClick={deleteSavedActivities}> delete saved activities </button>
        {state ?
        <button className="btn--outlineSmall" color="#FFFF33" onClick={handleClick}>
              <i className="fa fa-star  " aria-hidden="true" />
        </button>
        : 
        <button className="btn--outlineSmall" onClick={handleClick}>
            <i className="fa fa-star  " aria-hidden="true" />
        </button>}
        </>
    )
}

export default Save_activity_button