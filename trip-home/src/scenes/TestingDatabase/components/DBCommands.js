import React from 'react';
import { useQuery, useLazyQuery, gql , useMutation} from '@apollo/client';
import {GET_TRIP_USER_BY_ID, GET_TRIP_USER_BY_EMAIL, GET_SERVICE, GET_ACTIVITY, GET_HOTEL, GET_RESTAURANT} from '../GraphQL/queries.js';
import {CREATE_HOTEL_PHOTO_PRICERANGE} from '../GraphQL/inserts.js';

export function UserIdInDatabase({user_id}) {
    
    const { loading, error, data } = useQuery(
        GET_TRIP_USER_BY_ID,
        {
            variables: {user_id}
        }
    );
  
    console.log("user_id entered = " + user_id);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data) return true;
  
    return false;
}

export function UserEmailInDatabase({email}) {
    
    const { loading, error, data } = useQuery(
        GET_TRIP_USER_BY_EMAIL,
        {
            variables: {email}
        }
    );
  
    console.log("email entered = " + email);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data) return true;
  
    return false;
}

export function ServiceInDatabase({lat, lng}) {
    
    const { loading, error, data } = useQuery(
        GET_SERVICE,
        {
            variables: {lat, lng}
        }
    );
  
    console.log("service coordinates entered = lat:" + lat + " lng:" + lng);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data.service_by_pk != null){
        return true;
    }
  
    return false;
}

export function ActivityInDatabase({name, street}) {
    
    const { loading, error, data } = useQuery(
        GET_ACTIVITY,
        {
            variables: {name, street}
        }
    );
  
    console.log("activity entered = name:" + name + " street:" + street);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data.activity_by_pk != null){
        return true;
    }
  
    return false;
}

export function HotelInDatabase({name, street}) {
    
    const { loading, error, data } = useQuery(
        GET_HOTEL,
        {
            variables: {name, street}
        }
    );
  
    console.log("hotel entered = name:" + name + " street:" + street);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data.hotel_by_pk != null){
        return true;
    }
  
    return false;
}

export function RestaurantInDatabase({name, street}) {
    
    const { loading, error, data } = useQuery(
        GET_RESTAURANT,
        {
            variables: {name, street}
        }
    );
  
    console.log("restaurant entered = name:" + name + " street:" + street);
  
    if (error) return "error";
    if (loading) return "loading";
    if(data.restaurant_by_pk != null){
        return true;
    }
  
    return false;
}

/*
export function CreateHotel({name, street, phone_number, pricerange, photo, lat, lng}){

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
    return false;
}
*/