import React, { Component } from 'react';
import "./recentGames.css";

import convertDate from "../../utils/convertDate";
import getTeamName from "../../utils/getTeamName";

import GameBlock from "../../utils/gameBlock";
import Slide from "react-reveal/Slide";

class Games extends Component {

  state = {
    games: []
  }

  componentDidMount() {
    const year = new Date().getFullYear()-1;
    const nbaSchedule = `http://data.nba.net/data/prod/v1/${year}/teams/rockets/schedule.json`;

    fetch("https://cors-anywhere.herokuapp.com/" + nbaSchedule)
      .then(res => res.json())
      .catch(error => console.log(error))
        .then(data => {
          // easier to reverse schedule and then look for played games
          let teamData = data.league.standard.reverse();

          let displayedGames = [];
          let counter = 0;

          for (let i=0; i<teamData.length; i++) {
            // skipping preseason games
            if (teamData[i].seasonStageId === 1) {
              continue;
            }

            // statusNum=1 means game not played. statusNum=3 means game played
            if (teamData[i].statusNum === 3) {
              let transformed = {
                id: teamData[i].gameId,
                away: getTeamName(teamData[i].vTeam.teamId),
                awayScore: teamData[i].vTeam.score,
                awayThmb: getTeamName(teamData[i].vTeam.teamId).toLowerCase(),
                date: convertDate(teamData[i].startDateEastern),
                home: getTeamName(teamData[i].hTeam.teamId),
                homeScore: teamData[i].hTeam.score,
                homeThmb: getTeamName(teamData[i].hTeam.teamId).toLowerCase()
              };
              displayedGames.push(transformed);
              counter++;
            }

            // showing a max of 6 recent games
            if (counter === 6) {
              break;
            }
          }

          this.setState({
            // reverse array so games are in ascending order again
            games: displayedGames.reverse()
          });
        });
  }

  render() {
    return (
      <div className="recentG_games">
        {this.state.games ?
          this.state.games.map((g) => (
            <Slide bottom key={g.id}>
              <div className="recentG_item">
                <GameBlock game={g} />
              </div>
            </Slide>
          ))
          : 
          null}
      </div>
    );
  }
}

export default Games;