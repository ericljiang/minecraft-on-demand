import React from 'react';

export default class PlayerList extends React.Component {
  render() {
    const countOnline = this.props.players.online
    const sample = this.props.players.sample || [];
    return (
      <div>
        <p>{countOnline} player(s) online</p>
        <ul>
        {sample.sort((a, b) => a.name.localeCompare(b.name)).map(p =>
          <li key={p.id}>{p.name}</li>
        )}
        </ul>
      </div>
    );
  }
}