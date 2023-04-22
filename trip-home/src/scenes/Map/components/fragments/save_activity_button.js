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
    const [state, setState] = useState(null);
    const [savedActivities, setSavedActivities] = useState(user_data.savedActivities);

    //Check if the activity is already saved, if it is set saved to true
    const isFound = savedActivities.some(item => {
        if (item.lat === lat && item.lng === lng && item.name === name) {
          return true;
        }
    
        return false;
      });

    //graphiql mutation to create an entry in the saved activities table
    const [create_activity, activity_loading, activity_error] = useMutation(CREATE_SAVED_ACTIVITY, {
        variables: {
            lat: lat,
            lng: lng,
            name: name,
            user_id: id
        }
    })
    
    //graphiql mutation to remove an entry in the saved activities table
    const [delete_activity, delete_activity_loading, delete_activity_error] = useMutation(REMOVE_SAVED_ACTIVITY, {
        variables: {
            lat: lat,
            lng: lng,
            name: name,
            user_id: id
        }
    })

    //Every time state is changed the saved activities list will be updated accordingly
    useEffect(() => {
        if(state === false && isFound === true){
            delete_activity();
            removeItem();
        }
        else if(state === true && isFound === false){
            create_activity();
            setSavedActivities(prevSavedActivities => [...prevSavedActivities, {lat: lat, lng: lng, name: name}])
        }
    }, [state])

    //removes the location from the array
    const removeItem = () => {
        setSavedActivities((current) =>
          current.filter((item) => (item.lat !== lat && item.lng !== lng && item.name !== name))
        );
      };

    //update json everytime the list changes
    useEffect(() => {
        console.log(savedActivities)
        user_data.savedActivities = savedActivities;
    }, [savedActivities])

    //update savedActivities everytime button is pressed that way the list of saved activities can be transfered from button to button
    function getSavedActivities () {
        setSavedActivities(user_data.savedActivities)
    }
    
    return (
        <>
        {isFound === true ?
        <button className="btn--outlineSmallSuccess"  onClick={ () => {
            getSavedActivities();
            setState(false);
        }}> Saved
              <i className="fa fa-star fa-success " aria-hidden="true" />
        </button>
        : 
        <button className="btn--outlineSmall" onClick={ () => {
            getSavedActivities();
            setState(true);
        }}>
            <i className="fa fa-star  " aria-hidden="true" />
        </button>}
        </>
    )
}

export default Save_activity_button