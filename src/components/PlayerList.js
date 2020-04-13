import React from 'react';
import './PlayerList.css'

export default class PlayerList extends React.Component {
  render() {
    const countOnline = this.props.players.online
    const sample = this.props.players.sample || [];
    return (
      <>
        <p>{countOnline} player(s) online</p>
        <ul className="PlayerList">
        {sample.sort((a, b) => a.name.localeCompare(b.name)).map(p =>
          <li className="Player" key={p.id}>
            <img src={`https://minotar.net/helm/${p.id}/8`} alt={p.name} title={p.name}/>
          </li>
        )}
        </ul>
      </>
    );
  }
}