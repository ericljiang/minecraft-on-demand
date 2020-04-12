import React from 'react';
import {startServer} from '../api/server'

class StartServerButton extends React.Component {
  render() {
    const onClick = () => {
      startServer();
      this.props.onClick();
    }
    return <button onClick={onClick}>Start server</button>;
  }
}

export default StartServerButton;
