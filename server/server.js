import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import { schema } from './src/schema';
var cors = require('cors');

const PORT = 4000;

const server = express();
const ws = createServer(server);

server.use('*', cors({ origin: 'http://localhost:3000' }));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
}));

server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.get('/', function (req, res) {
  res.send('Hello World!');
});

ws.listen(PORT, 
  () => {
    console.log(`GraphQL Server is now running on http://localhost:${PORT}`)
    new SubscriptionServer({
      execute,
      subscribe,
      schema
    }, {
      server: ws,
      path: '/subscriptions'
    });
  }
)
