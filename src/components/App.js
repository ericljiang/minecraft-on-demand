import React from 'react';
import './App.css';
import Dashboard from './Dashboard';
import ServerStatus from './ServerStatus.js'

function App() {
  return (
    <div className="App">
      <ServerStatus />
      <Dashboard />
    </div>
  );
}

export default App;
