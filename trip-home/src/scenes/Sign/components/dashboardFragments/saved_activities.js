import React, { useEffect, useState } from "react"
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_SAVED_ACTIVITY, GET_TRIP_USER_BY_EMAIL } from "../../../TestingDatabase/GraphQL/queries.js"
import { Link } from 'react-router-dom';
import user_data from '../../../TestingDatabase/pages/user.json';
import "../styles/saved_activities.css";

const Saved_activities = (props) => {
  const user_id = user_data.id;
  const [status, setStatus] = useState("loading");
  const [activity_status, setActivity_status] = useState("loading");
  const [activities, setActivities] = useState([]);
  const email = user_data.email
  const [drop_value, setDrop_value] = React.useState("Choose...");
  const [selected, setSelected] = useState("");

  console.log(user_id + " || " + email + " || " + user_data.email)

  //finds all the items in the saved activities table that have a given user_id
  const [get_activities, { loading: activity_loading, error: activity_error, data: activity_data }] = useLazyQuery(GET_SAVED_ACTIVITY)

  //once the user_id is changed to an actual id in db, run the above query
  useEffect(() => {
    if (user_id !== "") {
      get_activities({ variables: { user_id: user_id }, onCompleted: setActivity_status("complete") })
    }
  }, [user_id])

  //once the above query has finished, grab all items in the returned list
  useEffect(() => {
    console.log("activity status use effect")
    if (activity_status === "complete" && activity_data !== undefined && activity_data.saved_activity && activity_data.saved_activity[0]) {
      console.log(activity_data)
      setActivities(activity_data.saved_activity)
      setSelected(activity_data.saved_activity[0])
    }
    if (activity_status === "loading") {
      console.log("just wait")
    }
    else {
      setActivity_status("loading")
      get_activities({ variables: { user_id: user_id }, onCompleted: setActivity_status("complete") })
    }
  }, [activity_status])

  const handleChange = (event) => {
    setDrop_value(event.target.value);
    if (event.target.value !== "Choose...") {
      setSelected({
        name: event.target.value.split("_")[0],
        lat: parseFloat(event.target.value.split("_")[1]),
        lng: parseFloat(event.target.value.split("_")[2])
      });
    }
    console.log(drop_value)
  };

  const pushType = (type) => {
    selected.type = type
    selected.activity_flag = true
  }

  if (activity_loading) return <div> loading, please hold </div>
  if (activity_error) return <div> {`Error! ${activity_error.message}`}</div>
  if (activity_data && activity_data !== undefined && activity_data.saved_activity && activity_data.saved_activity[0]) {
    console.log("email: " + email)
    user_data.savedActivities = [];
    activity_data.saved_activity.map(activity => (
      user_data.savedActivities.push({ lat: activity.lat, lng: activity.lng, name: activity.name })
    ))
    console.log(user_data.savedActivities)
    return (
      <div>
        <label> Saved Activities: </label>
        <select value={drop_value} onChange={handleChange} className="SavedActivitieList">
          <option value={"Choose..."} className='btn btn-light'> Choose... </option>
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
          onClick={() => pushType(drop_value)}
          state={selected}>
          <button className="btn--primary activitie-button" disabled={drop_value === "Choose..."}>
            Start a trip with this location
          </button>
        </Link>
      </div>
    )
  }
  return <div> There are no saved activities </div>
}
export default Saved_activities;