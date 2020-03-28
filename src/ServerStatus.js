import React from 'react';
import StartServerButton from './StartServerButton.js'

class ServerStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      instance: null,
      instanceIntervalId: null,
      server: null,
      serverIntervalId: null,
      recentlyStarted: false
    };
    this.getInstanceStatus = this.getInstanceStatus.bind(this);
    this.updateInstanceStatus = this.updateInstanceStatus.bind(this);
    this.getServerStatus = this.getServerStatus.bind(this);
    this.updateServerStatus = this.updateServerStatus.bind(this);
    this.setRecentlyStarted = this.setRecentlyStarted.bind(this);
    this.generateMessage = this.generateMessage.bind(this);
  }

  componentDidMount() {
    this.updateInstanceStatus();
    this.updateServerStatus();
  }

  componentDidUpdate(_, prevState) {
    if (this.state.recentlyStarted && !prevState.recentlyStarted) {
      this.updateInstanceInterval(1000);
    } else if (this.state.instance &&
        (!prevState.instance || this.state.instance.State.Name !== prevState.instance.State.Name)) {
      this.setState({recentlyStarted: false})
      const state = this.state.instance.State.Name;
      const period = {
        "stopped": 10000,
        "pending": 1000,
        "running": 30000,
        "stopping": 5000
      }[state];
      this.updateInstanceInterval(period);

      if (state === "running") {
        if (this.state.server && this.state.server.players) {
          this.updateServerInterval(15000);
        } else {
          this.updateServerInterval(2000);
        }
      } else {
        this.updateServerInterval(null);
      }
    } else {
      // once the server has started, don't check its status as often
      if (this.state.server && this.state.server.players && (!prevState.server || !prevState.server.players)) {
        this.updateServerInterval(15000);
      }

      // if the server stopped responding it probably means the instance is shutting down
      if (!this.state.server && prevState.server) {
        this.updateInstanceStatus();
      }
    }
  }

  updateServerInterval(period) {
    clearInterval(this.state.serverIntervalId);
    if (period) {
      const intervalId = setInterval(this.updateServerStatus, period);
      this.setState({serverIntervalId: intervalId});
    } else {
      this.setState({serverIntervalId: null});
    }
  }

  updateServerStatus() {
    this.getServerStatus((response) => {
      if (response.ping != null) {
        this.setState({server: response});
      } else {
        this.setState({server: null});
      }
    });
  }

  getServerStatus(callback) {
    fetch("https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftServerStatus/mc.ericjiang.me")
      .then((response) => response.json())
      .then(callback);
  }

  updateInstanceInterval(period) {
    clearInterval(this.state.instanceIntervalId);
    const intervalId = setInterval(this.updateInstanceStatus, period);
    this.setState({instanceIntervalId: intervalId});
  }

  updateInstanceStatus() {
    this.getInstanceStatus((data) => {
      const instance = data.Reservations[0].Instances[0];
      this.setState({instance: instance});
    });
  }

  getInstanceStatus(callback) {
    fetch("https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftInstanceStatus")
      .then((response) => response.json())
      .then(callback);
  }

  setRecentlyStarted() {
    this.setState({recentlyStarted: true});
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
          if (!this.state.server) {
            return `Instance is running at ${this.state.instance.PublicIpAddress}. Waiting for server to start...`;
          } else if (!this.state.server.players) {
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

  render() {
    const showStartServerButton = this.state.instance && this.state.instance.State.Name === "stopped";
    const showPlayers = this.state.server && this.state.server.players;
    return (
      <>
        {showStartServerButton && <StartServerButton onClick={this.setRecentlyStarted} />}
        <h1>{this.generateMessage()}</h1>
        {showPlayers && <p>{this.state.server.players.online} players online</p>}
      </>
    );
  }
}

export default ServerStatus;
