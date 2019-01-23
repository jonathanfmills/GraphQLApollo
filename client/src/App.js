import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import {
  ApolloProvider
} from 'react-apollo';
import gql from "graphql-tag";
import {graphql} from 'graphql';
import logo from './logo.svg';
import './App.css';

import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
 import { typeDefs } from './schema';

const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema });

const GQLMockHOC = (query) => (Component) => 
  class GQLMock extends React.Component {

    constructor(props) {
      console.log(props);
      super(props);
      console.log('after super');
      this.state = { data: null}
    }

    async componentWillMount() {
      console.log('CWM');
      console.log(schema)
      const response = await graphql(schema, query)
      console.log(response.data);
      this.setState({ data: response.data })
    }

    render() {
      console.log('render');
      const { data } = this.state
      return (data) ? <Component data={data} {...this.props} /> : <div>Loading</div>
  }

}


const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const ChannelsList = ({data: {loading, error, channels}}) => {
  if(loading) {
    return <p>Loading...</p>
  }
  if(error) {
    return <p>{error.message}</p>
  }
  return   <ul>
      {channels.map (ch => <li key={ch.id} > {ch.name}</li>)}
  </ul>
};


const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = GQLMockHOC(channelsListQuery)(ChannelsList);

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
