import React from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const GET_TRIP_USER = gql`
query Search($user_id: Int) {
    trip_user(where: {user_id: {_eq: $user_id}}) {
      email
      first_name
      last_name
      password
      phone_number
      user_id
      user_name
    }
  }
`;

const GET_SERVICE = gql`
query Search($coordinates: Int) {
    service_by_pk(coordinates: "$coordinates") {
      admin_id
      coordinates
      trip_id
      type
      user_id
    }
  }
`;

const GET_TRIP = gql`
query Search($trip_id: Int) {
    trip_by_pk(trip_id: $trip_id) {
      city
      duration
      trip_id
      user_id
    }
  }
`;

const GET_ACTIVITY = gql`
query Search($name: String!, $street: String!) {
    activity_by_pk(name: $name, street: $street) {
      coordinates
      name
      phone_number
      photo
      pricerange
      street
      type
    }
  }
`;

const GET_HOTEL = gql`
query Search($name: String!, $street: String!) {
  hotel_by_pk(name: "$name", street: "%street") {
    lat
    lng
    name
    phone_number
    photo
    pricerange
    street
  }
}
`;

const GET_RESTAURANT = gql`
query Search($name: String!, $street: String!) {
  restaurant_by_pk(name: "$name", street: "$street") {
    lat
    lng
    name
    phone_number
    photo
    pricerange
    street
    type
  }
}
`;

const GET_ADMIN = gql`
query Search($admin_id: String!) {
  admin_by_pk(admin_id: $admin_id) {
    admin_id
    can_modify
    email
    first_name
    last_name
    password
  }
}
`;


export default function Users({user_id}) {
    
    const { loading, error, data } = useQuery(
        GET_TRIP_USER,
        {
            variables: {user_id}
        }
    );

    console.log(user_id);

    if (error) return <p> error :( {error.message}</p>
    if (loading) return <p>loading</p>;

    return data.trip_user.map(({ user_id, first_name, last_name}) => (
        <div>
            <p>
                {user_id} | {first_name} | {last_name}
            </p>
        </div>
    ))
}