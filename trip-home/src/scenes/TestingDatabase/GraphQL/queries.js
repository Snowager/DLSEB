import React from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

export const GET_TRIP_USER_BY_ID = gql`
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

export const GET_TRIP_USER_BY_EMAIL = gql`
query Search($email: String) {
    trip_user(where: {email: {_eq: $email}}) {
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

export const GET_SERVICE = gql`
query Search($lat: String!, $lng: String!) {
  service_by_pk(lat: $lat, lng: $lng) {
    admin_id
    lat
    lng
    trip_id
    type
    user_id
  }
}
`;

export const GET_TRIP = gql`
query Search($trip_id: Int) {
    trip_by_pk(trip_id: $trip_id) {
      city
      duration
      trip_id
      user_id
    }
  }
`;

export const GET_ACTIVITY = gql`
query MyQuery($name: String!, $street: String!) {
  activity_by_pk(name: $name, street: $street) {
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

export const GET_HOTEL = gql`
query MyQuery($name: String!, $street: String!) {
  hotel_by_pk(name: $name, street: $street) {
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

export const GET_RESTAURANT = gql`
query Search($name: String!, $street: String!) {
  restaurant_by_pk(name: $name, street: $street) {
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

export const GET_ADMIN = gql`
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