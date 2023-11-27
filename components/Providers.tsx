"use client"
import React from "react"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

export const Providers = ({children}: {children: React.ReactNode})  => {
    const client = new ApolloClient({
        uri: 'http://localhost:4000/',
        cache: new InMemoryCache(),
        credentials: 'same-origin'
      });
    return <ApolloProvider client={client}>{children}</ApolloProvider>
};