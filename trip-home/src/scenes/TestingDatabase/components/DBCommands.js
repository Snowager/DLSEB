import React from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import {GET_TRIP_USER_BY_ID, GET_TRIP_USER_BY_EMAIL, GET_SERVICE, GET_ACTIVITY, GET_HOTEL, GET_RESTAURANT} from '../GraphQL/queries.js';

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