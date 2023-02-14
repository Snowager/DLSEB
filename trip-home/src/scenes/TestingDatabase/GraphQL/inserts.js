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