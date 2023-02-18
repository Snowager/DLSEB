import React from 'react';
import { gql } from '@apollo/client';

export const CREATE_TRIP_USER = gql`
mutation MyMutation($email: String, $first_name: String, $last_name: String, $password: String, $phone_number: bpchar, $user_name: String) {
    insert_trip_user_one(object: {email: $email, first_name: $first_name, last_name: $last_name, password: $password, phone_number: $phone_number, user_name: $user_name}) {
    last_name
    }
  }
`;

export const CREATE_ADMIN = gql`
mutation MyMutation($email: String, $first_name: String, $last_name: String, $password: String, $can_modify: bpchar) {
    insert_admin_one(object: {can_modify: $can_modify, email: $email, first_name: $first_name, last_name: $last_name, password: $password}) {
      last_name
    }
  }
`;


export const CREATE_SERVICE = gql`
mutation MyMutation($address: String, $lat: String, $lng: String, $name: String, $phone_number: numeric, $photo: String, $type: String) {
  insert_service_one(object: {address: $address, lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, photo: $photo, type: $type}){
  	address
  }	
}
`;

//This one needs to be updated to match the current object in database
export const CREATE_IN_TRIP_DB = gql`
mutation MyMutation($service_id: Int, $lat: String!, $lng: String!, $trip_id: String!) {
  insert_in_trip_one(object: {service_id: $service_id, lat: $lat, lng: $lng, trip_id: $trip_id}){
    trip_id
  }
}
`;

export const CREATE_IN_TRIP_GOOGLE = gql`
mutation MyMutation($lat: String!, $lng: String!, $trip_id: String!) {
  insert_in_trip_one(object: {lat: $lat, lng: $lng, trip_id: $trip_id})
  trip_id
}
`;

export const CREATE_TRIP = gql`
mutation MyMutation($city: String!, $duration: numeric!, $trip_id: String!, $user_id: Int!) {
  insert_trip_one(object: {city: $city, duration: $duration, trip_id: $trip_id, user_id: $user_id}) {
    trip_id
  }
}
`;
/*
export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

*/