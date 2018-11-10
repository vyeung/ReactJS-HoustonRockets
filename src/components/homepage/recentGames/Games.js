import React, { Component } from 'react';
import "./recentGames.css";

import { firebaseGames } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";
import GameBlock from "../../utils/gameBlock";
import Slide from "react-reveal/Slide";

class Games extends Component {

  state = {
    games: []
  }

  componentDidMount() {
    //firebase get request
    firebaseGames.limitToLast(6).once("value")
      .then((snapshot) => {
        const formattedGames = firebaseLooper(snapshot);
        this.setState({
          games: formattedGames
        });
      });
  }

  render() {
    console.log(this.state.games);

    let showScores = (
      this.state.games ?
        this.state.games.map((g) => (
          <Slide bottom key={g.id}>
            <div className="recentG_item">
              <GameBlock game={g} />
            </div>
          </Slide>
        ))
      :null
    )

    return (
      <div className="recentG_games">
        {showScores}
      </div>
    );
  }
}

export default Games;