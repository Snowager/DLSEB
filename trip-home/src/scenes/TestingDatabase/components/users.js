import React from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import {GET_TRIP_USER_BY_ID, GET_TRIP_USER_BY_EMAIL} from '../GraphQL/queries.js';
import {UserIdInDatabase, UserEmailInDatabase, ServiceInDatabase, ActivityInDatabase, HotelInDatabase, RestaurantInDatabase} from './DBCommands.js';

function GetUsers({email}) {
    
  const { loading, error, data } = useQuery(
    GET_TRIP_USER_BY_EMAIL,
      {
          variables: {email}
      }
  );

  if (error) return "error";
  if (loading) return "loading";

  return data;
}


export default function Users({user_id, email, fakeEmail, lat, lng, name, street}) {
    
  /*
    const { loading, error, data } = useQuery(
        GET_TRIP_USER_BY_ID,
        {
            variables: {user_id}
        }
    );

    console.log(email);

    if (error) return <p> error :( {error.message}</p>
    if (loading) return <p>loading</p>;

    return data.trip_user.map(({ user_id, first_name, last_name, email, phone_number, user_name}) => (
        <div>
            <p>
                {user_id} | {user_name} | {first_name} | {last_name} | {email} | {phone_number}
            </p>
        </div>
    ))
    */
    const cole = GetUsers({email})

    console.log("is service in database? ==> " + RestaurantInDatabase({name, street}))

    if(cole == "error") return <h1>error</h1>;
    if(cole == "loading") return <h1>loading</h1>;


    return cole.trip_user.map(({ user_id, first_name, last_name, email, phone_number, user_name}) => (
      <div>
          <p>
              {user_id} | {user_name} | {first_name} | {last_name} | {email} | {phone_number}
          </p>
      </div>
  ))
}