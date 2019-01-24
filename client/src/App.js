import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
} from 'react-router-dom';

import { getMainDefinition } from 'apollo-utilities';
import ChannelsListWithData from './components/ChannelsListWithData';
import NotFound from './components/NotFound';
import ChannelDetails from './components/ChannelDetails';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

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

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4000/subscriptions`,
  options: {
    reconnect: true
  }
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <BrowserRouter>
          <div className="App">
            <Link to="/" className="navbar">React + GraphQL Tutorial</Link>
            <Switch>
              <Route exact path="/" component={ChannelsListWithData}/>
              <Route path="/channel/:channelId" component={ChannelDetails}/>
              <Route component={ NotFound }/>
            </Switch>
          </div>
        </BrowserRouter>
       </ApolloProvider>
    );
  }
}

export default App;
