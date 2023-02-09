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

export const CREATE_TRIP = gql`
mutation MyMutation($city: String, $duration: numeric, $user_id: Int) {
    insert_trip_one(object: {city: $city, duration: $duration, user_id: $user_id}) {
      user_id
    }
  }
`;

export const CREATE_SERVICE = gql`
mutation MyMutation($admin_id: Int = 10, $lat: String = "", $lng: String = "", $trip_id: Int = 10, $type: String = "", $user_id: Int = 10) {
    insert_service_one(object: {admin_id: $admin_id, lat: $lat, lng: $lng, trip_id: $trip_id, type: $type, user_id: $user_id}) {
      admin_id
      trip_id
      type
      user_id
    }
  }
`;

export const CREATE_HOTEL = gql`
mutation MyMutation($lat: String, $lng: String, $name: String, $phone_number: bpchar, $photo: String, $street: String) {
    insert_hotel_one(object: {lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, street: $street}) {
      lat
      lng
      photo
      pricerange
    }
  }
`;

export const CREATE_HOTEL_PHOTO = gql`
mutation MyMutation($lat: String, $lng: String, $name: String, $phone_number: bpchar, $street: String, $photo: String) {
    insert_hotel_one(object: {lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, street: $street, photo: $photo}) {
      lat
      lng
      photo
      pricerange
    }
  }
`;

export const CREATE_HOTEL_PRICERANGE = gql`
mutation MyMutation($lat: String, $lng: String, $name: String, $phone_number: bpchar, $street: String, $pricerange: String) {
    insert_hotel_one(object: {lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, street: $street, pricerange: $pricerange}) {
      lat
      lng
      photo
      pricerange
    }
  }
`;

export const CREATE_HOTEL_PHOTO_PRICERANGE = gql`
mutation MyMutation($lat: String, $lng: String, $name: String, $phone_number: bpchar, $street: String, $pricerange: String, $photo: String) {
    insert_hotel_one(object: {lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, street: $street, pricerange: $pricerange, photo: $photo}) {
      lat
      lng
      photo
      pricerange
    }
}
`;

export const CREATE_ACTIVITY = gql`
mutation MyMutation($lat: String, $lng: String, $name: String, $phone_number: bpchar, $street: String, $photo: String, $pricerange: String, $type: String) {
    insert_activity_one(object: {lat: $lat, lng: $lng, name: $name, phone_number: $phone_number, street: $street, photo: $photo, pricerange: $pricerange, type: $type}) {
      photo
      pricerange
      type
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

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

`;

export const CREATE_ = gql`

*/