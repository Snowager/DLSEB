import { gql } from '@apollo/client';

export const GET_TRIP_USER_BY_ID = gql`
query GET_TRIP_USER_BY_ID($user_id: Int) {
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
query GET_TRIP_USER_BY_EMAIL($email: String) {
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
query GET_TRIP_USER_BY_USER_NAME($user_name: String!) {
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
query GET_TRIP($trip_id: Int) {
    trip_by_pk(trip_id: $trip_id) {
      city
      duration
      trip_id
      user_id
    }
  }
`;

export const GET_TRIP_BY_USER_ID = gql`
query GET_TRIP_BY_USER_ID($user_id: Int) {
  trip(where: {user_id: {_eq: $user_id}}) {
    user_id
    city
    duration
    trip_id
  }
}
`;

export const GET_ADMIN = gql`
query GET_ADMIN($admin_id: String!) {
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
query GET_SERVICE($id: Int!) {
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
query GET_SERVICE_BY_ADDRESS($address: String!) {
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
query GET_SERVICE_BY_LAT_LNG($lat: String!, $lng: String!) {
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
query GET_IN_TRIP($id: Int!, $trip_id: String!) {
  in_trip_by_pk(id: $id, trip_id: $trip_id) {
    lat
    lng
    loc_name
    service_id
    trip_id
  }
}
`;

export const GET_IN_TRIP_BY_SERVICE = gql`
query GET_IN_TRIP_BY_SERVICE($id: Int!) {
  in_trip(where: {id: {_eq: $id}}) {
    lat
    lng
    loc_name
    service_id
    trip_id
  }
}
`;

export const GET_IN_TRIP_BY_TRIP = gql`
query GET_IN_TRIP_BY_TRIP($trip_id: String!) {
  in_trip(where: {trip_id: {_eq: $trip_id}}) {
    lat
    lng
    loc_name
    service_id
    trip_id
  }
}

`;

export const GET_SAVED_ACTIVITY = gql`
query GET_SAVED_ACTIVITY($user_id: Int!) {
  saved_activity(where: {user_id: {_eq: $user_id}}) {
    service_id
    name
    lng
    lat
  }
}
`;