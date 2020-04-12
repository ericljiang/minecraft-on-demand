import React from 'react';

function generateMessage(instance, server, recentlyStarted) {
  if (instance) {
    switch (instance.State.Name) {
      case "stopped":
        if (recentlyStarted) {
          return "Starting instance...";
        } else {
          return "Server is stopped.";
        }
      case "pending":
        return "Instance is starting...";
      case "running":
        if (!server) {
          return `Instance is running at ${instance.PublicIpAddress}. Waiting for server to start...`;
        } else if (!server.players) {
          return "Loading world...";
        } else {
          return "Server is running at mc.ericjiang.me.";
        }
      case "stopping":
        return "Instance is stopping...";
      default:
        return "Unknown status."
    }
  } else {
    return "Loading...";
  }
}

export default function ServerStatusMessage(props) {
  return <h1>{generateMessage(props.instance, props.server, props.recentlyStarted)}</h1>;
}