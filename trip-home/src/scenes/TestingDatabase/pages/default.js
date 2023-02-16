import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Users from '../components/users.js';
import { setContext } from '@apollo/client/link/context';

const db_authLink = setContext((_, { headers }) => {
    return {
    headers: {
         ...headers, 'x-hasura-admin-secret': '4oeaNs0xOCILPF6vILBi5XooarVjjRGHxpfgj07AYyRPxyF82kKnc7zTFWRe4xfu'
       }
     }
   });

const db_httpLink = createHttpLink({
    uri: 'https://great-bird-64.hasura.app/v1/graphql',
});

const db_client = new ApolloClient({
    cache: new InMemoryCache(),
    link: db_authLink.concat(db_httpLink)
})


const Default = () => {

    return (
    <ApolloProvider client ={db_client}>
        <Users 
        user_id={2} 
        email={'test@test.aaaah'} 
        fakeEmail={'test@gmail.com'} 
        lat={"40.40857608351398"} 
        lng={"-104.7793644195992"} 
        name={"Test Shack3"}
        street={"1819 65th Ave WEST, Greeley, CO 80634"}
        phone_number={"1234567890"}
        pricerange={"null"}
        photo={"test.jpg"}
        />
    </ApolloProvider>
    )
}
export default Default;