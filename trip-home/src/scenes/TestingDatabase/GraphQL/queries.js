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

export const GET_TRIP_USER_BY_USER_NAME = gql`
query MyQuery($user_name: String!) {
  trip_user(where: {user_name: {_eq: $user_name}}) {
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

export const GET_SERVICE = gql`
query MyQuery($id: Int!) {
  service_by_pk(id: $id) {
    address
    lat
    lng
    id
    name
    phone_number
    photo
    type
  }
}
`;

export const GET_SERVICE_BY_ADDRESS = gql`
query MyQuery($address: String!) {
  service(where: {address: {_eq: $address}}) {
    id
    address
    lat
    lng
    name
    phone_number
    photo
    type
  }
}
`;

export const GET_SERVICE_BY_LAT_LNG = gql`
query MyQuery($lat: String!, $lng: String!) {
  service(where: {lat: {_eq: $lat}, lng: {_eq: $lng}}) {
    id
    address
    lat
    lng
    name
    phone_number
    photo
    type
  }
}
`;

//not sure why you'd need this one but here it is anyway
export const GET_IN_TRIP = gql` 
query MyQuery($id: Int!, $trip_id: String!) {
  in_trip_by_pk(id: $id, trip_id: $trip_id) {
    id
    trip_id
  }
}
`;

export const GET_IN_TRIP_BY_SERVICE = gql`
query MyQuery($id: Int!) {
  in_trip(where: {id: {_eq: $id}}) {
    id
    trip_id
  }
}
`;

export const GET_IN_TRIP_BY_TRIP = gql`
query MyQuery($trip_id: String!) {
  in_trip(where: {trip_id: {_eq: $trip_id}}) {
    id
    trip_id
  }
}
`;