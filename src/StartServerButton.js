import React from 'react';

class StartServerButton extends React.Component {

  startServer() {
    fetch('https://0pthbtylvg.execute-api.us-east-1.amazonaws.com/startMinecraftInstance', { method: 'POST' })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    const onClick = () => {
      this.startServer();
      this.props.onClick();
    }
    return <button onClick={onClick}>Start server</button>;
  }
}

export default StartServerButton;
