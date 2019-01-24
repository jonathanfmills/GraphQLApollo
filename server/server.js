import express from 'express';
const { ApolloServer } = require('apollo-server-express');
import { createServer } from 'http';

import { schema } from './src/schema';
var cors = require('cors');

const PORT = 4000;

const server = express();

const apollo = new ApolloServer({ 
  schema
});

apollo.applyMiddleware({ app: server, path: '/graphql' });
const ws = createServer(server);
apollo.installSubscriptionHandlers(ws);

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.get('/', function (req, res) {
  res.send('Hello World!');
});

ws.listen(PORT, 
  () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}${server.graphqlPath}`)
  }
)
