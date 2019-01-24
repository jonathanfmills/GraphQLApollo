import {
   makeExecutableSchema,
   addMockFunctionsToSchema,
 } from 'graphql-tools';
 import { resolvers } from './resolvers';

 
 const typeDefs = `
 type Channel {
   id: ID!                # "!" denotes a required field
   name: String
   messages: [Message]!
}

type Message {
  id: ID!
  text: String
}

# This type specifies the entry point into our API in this case
# there is only one - "Channels" -- which returns a list of channels.
type Query {
  channels: [Channel] # "[]" means this is a list of Channels
  channel(id: ID!): Channel
}

input MessageInput{
  channelId: ID!
  text: String
}

 # The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
  addMessage(message: MessageInput!): Message
}
`;
 
 const schema = makeExecutableSchema({ typeDefs, resolvers });
 export { schema };