
import React from 'react';
import {
    graphql,
} from 'react-apollo';
import gql from "graphql-tag";


const ChannelPreview = () => {

  let channel = { name: "Stub Name"}

  return (
    <div className="channelName">
      {channel.name}
    </div>
  );
};


export default (ChannelPreview);