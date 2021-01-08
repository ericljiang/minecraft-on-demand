import React from 'react';
import {Collapse} from 'react-collapse';
import './Dashboard.css';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = { isOpened: false };
  }

  render() {
    return (
      <div className="Dashboard">
        <button onClick={() => this.setState({ isOpened: !this.state.isOpened })}>Toggle dashboard</button>
        <Collapse isOpened={this.state.isOpened}>
          <iframe title="Dashboard" src="https://cloudwatch.amazonaws.com/dashboard.html?dashboard=Minecraft&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTMyMzcyOTA1NDQxOSIsIlUiOiJ1cy1lYXN0LTFfTjI4Ynp3NFJYIiwiQyI6IjNnZzd0cHNmOXIwMmloYjdqaWdma2NqMDNxIiwiSSI6InVzLWVhc3QtMTplNmJkNjBmYS1iY2ZkLTQ2YjAtYWFlMi0xMmEwNTA3MmEyY2QiLCJNIjoiUHVibGljIn0%3D"></iframe>
        </Collapse>
      </div>
    );
  }
}

export default Dashboard;
