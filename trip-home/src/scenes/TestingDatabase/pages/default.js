import React, {useState, useEffect} from 'react';
import { render } from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import Users from '../components/users.js';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    return {
    headers: {
         ...headers, 'x-hasura-admin-secret': '4oeaNs0xOCILPF6vILBi5XooarVjjRGHxpfgj07AYyRPxyF82kKnc7zTFWRe4xfu'
       }
     }
   });

const httpLink = createHttpLink({
    uri: 'https://great-bird-64.hasura.app/v1/graphql',
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
})

const Default = () => {

    return (
    <ApolloProvider client ={client}>
        <Users 
        user_id={2} 
        email={'test@test.aaaah'} 
        fakeEmail={'test@gmail.com'} 
        lat={"40.40857608351398"} 
        lng={"-104.7793644195992"} 
        name={"Wing shack"}
        street={"1815 65th Ave WEST, Greeley, CO 80634"}
        />
    </ApolloProvider>
    )
}
export default Default;