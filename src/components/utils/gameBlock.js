import React from 'react';
import "./gameBlock.css";

const gameBlock = (props) => {

  // must use require keyword when not using import img method
  const homeTeamImage = require(`../../assets/nba_team_logos/${props.game.homeThmb}.png`);
  const awayTeamImage = require(`../../assets/nba_team_logos/${props.game.awayThmb}.png`);
  
  return (
    <div>
      <div className="game_date">
        {props.game.result==="C" ? 
          `${props.game.date}: Cancelled` 
          : 
          props.game.date}
      </div>

      <div className="home_team">
        <div className="left_block">
          <img src={homeTeamImage.default} alt="icon"/>
          <div className="team_name">
            {props.game.home}
          </div>
        </div>
        <div className="right_block">
          {props.game.homeScore}
        </div>
      </div>

      <div className="away_team">
        <div className="left_block">
          <img src={awayTeamImage.default} alt="icon"/>
          <div className="team_name">
            {props.game.away}
          </div>
        </div>
        <div className="right_block">
          {props.game.awayScore}
        </div>
      </div>
    </div>
  );
};

export default gameBlock;