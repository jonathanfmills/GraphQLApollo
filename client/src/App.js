import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, concat } from 'apollo-link';
import {
  ApolloProvider,
  graphql
} from 'react-apollo';
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.css';

import ChannelsListWithData from './components/ChannelsListWithData';

import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
 import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <div className="App">
           <div className="App-header">
             <img src={logo} className="App-logo" alt="logo" />
             <h2>Welcome to Apollo</h2>
           </div>
           <ChannelsListWithData />
         </div>
       </ApolloProvider>
    );
  }
}

export default App;
