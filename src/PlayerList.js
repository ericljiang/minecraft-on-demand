import React from 'react';

export default class PlayerList extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.players.online} player(s) online</p>
        <ul>
        {this.props.players.sample.sort((a, b) => a.name.localeCompare(b.name)).map(p =>
          <li key={p.id}>{p.name}</li>
        )}
        </ul>
      </div>
    );
  }
}