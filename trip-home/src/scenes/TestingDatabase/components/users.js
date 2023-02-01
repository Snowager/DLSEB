import React from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';
import {GET_TRIP_USER_BY_ID, GET_TRIP_USER_BY_EMAIL} from '../GraphQL/queries.js';
import {CREATE_HOTEL_PHOTO_PRICERANGE} from '../GraphQL/inserts.js';
import {UserIdInDatabase, UserEmailInDatabase, ServiceInDatabase, ActivityInDatabase, HotelInDatabase, RestaurantInDatabase, CreateHotel} from './DBCommands.js';

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

export default function Users({user_id, email, fakeEmail, lat, lng, name, street, phone_number, pricerange, photo}) {

    const [DoIt, { loading, error, data }] = useMutation(
        CREATE_HOTEL_PHOTO_PRICERANGE,
        {
            variables: {name, street, phone_number, pricerange, photo, lat, lng}
        }
    );
  
    if(HotelInDatabase({name, street})) return "hotel already in database";
  
    if (error) {
        console.log("Couldn't create hotel with values: NAME:" + name + " STREET:" + street + " PHONENUMBER:" + phone_number + " PRICERANGE:" + pricerange + " PHOTO:" + photo + " LAT:" + lat + " LNG:" + lng)
        console.log(`${error.message}`);
        return "error";
    }
    if (loading) {
        console.log("Creating Hotel")
        return "loading";
    }
    if(data && data.insert_activity_one != null){
        console.log("Successfully created hotel with values: NAME:" + name + " STREET:" + street + " PHONENUMBER:" + phone_number + " PRICERANGE:" + pricerange + " PHOTO:" + photo + " LAT:" + lat + " LNG:" + lng)
        return true;
    }

    const cole = GetUsers({email})
    let name1 = null;
    let street1 = "1815 65th Ave WEST, Greeley, CO 80634";
    //console.log(CreateHotel({name, street, phone_number, pricerange, photo, lat, lng}))
    console.log("is service in database? ==> " + HotelInDatabase({name, street}))

    if(cole == "error") return <h1>error</h1>;
    if(cole == "loading") return <h1>loading</h1>;


    return cole.trip_user.map(({ user_id, first_name, last_name, email, phone_number, user_name}) => (
      <div>
          <p>
              {user_id} | {user_name} | {first_name} | {last_name} | {email} | {phone_number}
          </p>
          <div onClick={DoIt}>doit</div>
      </div>
  ))
}