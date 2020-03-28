import React from 'react';
import StartServerButton from './StartServerButton.js'

class ServerStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      instance: null,
      instanceIntervalId: null,
      server: null,
      recentlyStarted: false
    };
    this.getInstanceStatus = this.getInstanceStatus.bind(this);
    this.updateInstanceStatus = this.updateInstanceStatus.bind(this);
    this.setRecentlyStarted = this.setRecentlyStarted.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
  }

  componentDidMount() {
    this.updateInstanceStatus();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.recentlyStarted && !prevState.recentlyStarted) {
      this.updateInstanceInterval(1000);
    } else if (this.state.instance &&
        (!prevState.instance || this.state.instance.State.Name !== prevState.instance.State.Name)) {
      this.setState({ recentlyStarted: false })
      const state = this.state.instance.State.Name;
      const period = {
        "stopped": 10000,
        "pending": 1000,
        "running": 20000,
        "stopping": 5000
      }[state];
      this.updateInstanceInterval(period);
    }
  }

  updateInstanceInterval(period) {
    clearInterval(this.state.instanceIntervalId);
    const intervalId = setInterval(this.updateInstanceStatus, period);
    this.setState({ instanceIntervalId: intervalId });
  }

  updateInstanceStatus() {
    this.getInstanceStatus((data) => {
      const instance = data.Reservations[0].Instances[0];
      console.log(instance)
      this.setState({instance: instance});
    });
  }

  getInstanceStatus(callback) {
    fetch("https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftInstanceStatus")
      .then((response) => response.json())
      .then(callback);
  }

  setRecentlyStarted() {
    this.setState({ recentlyStarted: true });
  }

  generateMessage() {
    if (this.state.instance) {
      switch (this.state.instance.State.Name) {
        case "stopped":
          if (this.state.recentlyStarted) {
            return "Starting instance...";
          } else {
            return "Server is stopped.";
          }
        case "pending":
          return "Instance is starting...";
        case "running":
          if (false) {
            return "Server is running at mc.ericjiang.me.";
          } else {
            return `Instance is running at ${this.state.instance.PublicIpAddress}.` // Waiting for server to start...`;
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

  render() {
    const showStartServerButton = this.state.instance && this.state.instance.State.Name === "stopped";
    return (
      <>
        {showStartServerButton && <StartServerButton onClick={this.setRecentlyStarted} />}
        <h1>{this.generateMessage()}</h1>
      </>
    );
  }
}

export default ServerStatus;
