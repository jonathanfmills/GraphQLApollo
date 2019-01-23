import React from 'react';
import {graphql} from 'react-apollo';
import gql from "graphql-tag";

import { channelsListQuery } from './ChannelsListWithData';

const AddChannel = ({mutate}) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate( {
          variables: { 
            name: evt.target.value
          },
          optimisticResponse: {
            addChannel: {
              name: evt.target.value,
              id: Math.round(Math.random() * -1000000),
              __typename: 'Channel',
            },
          },
          update: ( store, { data: { addChannel } } ) => {
            const data = store.readQuery({query: channelsListQuery});
            data.channels.push(addChannel);
            store.writeQuery({ query: channelsListQuery, data });
          }
        }
      )
      .then( res => {
        evt.target.value = '';
      });
    }
  };
  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const AddChannelWithMutation = graphql(
  addChannelMutation
)(AddChannel);

export default AddChannelWithMutation;