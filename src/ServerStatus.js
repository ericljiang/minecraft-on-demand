import React from 'react';
import StartServerButton from './StartServerButton.js'

class ServerStatus extends React.Component {
  constructor() {
    super();
    this.state = {
      instance: null
    };
    this.updateServerStatus = this.updateServerStatus.bind(this);
  }

  componentDidMount() {
    this.updateServerStatus();
    setInterval(this.updateServerStatus, 1000);
  }

  updateServerStatus() {
    fetch('https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/minecraftInstanceStatus')
      .then((response) => response.json())
      .then((data) => {
        const instance = data.Reservations[0].Instances[0];
        console.log(instance)
        this.setState({instance: instance});
      });
  }

  render() {
    if (this.state.instance) {
      const instanceState = this.state.instance.State.Name;
      let message = `Server is ${instanceState}`;
      if (this.state.instance.PublicIpAddress) {
        message += ` at ${this.state.instance.PublicIpAddress}`;
      }
      return (
        <>
          <StartServerButton />
          <h1>{message}</h1>
        </>
      );
    } else {
      return (
        <>
          <StartServerButton />
          <h1>Loading...</h1>
        </>
      );
    };
  }
}

export default ServerStatus;
