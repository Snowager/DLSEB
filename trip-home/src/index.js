import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client ={db_client}>
        <App />
    </ApolloProvider>
);

