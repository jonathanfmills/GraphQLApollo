export const typeDefs = `
type Channel {
  id: ID!     # "!" denotes a required field 
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

`;