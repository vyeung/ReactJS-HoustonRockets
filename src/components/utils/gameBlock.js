import React from 'react';
import "./gameBlock.css";

const gameBlock = (props) => {

  return (
    <div>
      <div className="game_date">
        {props.game.final ? props.game.date : `${props.game.date}: Result TBD`}
      </div>

      <div className="home_team">
        <div className="left_block">
          {/*must use require keyword when not using import img method*/}
          <img src={require(`../../assets/nba_team_logos/${props.game.homeThmb}.png`)} alt="icon"/>
          <div className="team_name">
            {props.game.home}
          </div>
        </div>
        <div className="right_block">
          {props.game.resultHome}
        </div>
      </div>

      <div className="away_team">
        <div className="left_block">
          <img src={require(`../../assets/nba_team_logos/${props.game.awayThmb}.png`)} alt="icon"/>
          <div className="team_name">
            {props.game.away}
          </div>
        </div>
        <div className="right_block">
          {props.game.resultAway}
        </div>
      </div>
    </div>
  );
};

export default gameBlock;