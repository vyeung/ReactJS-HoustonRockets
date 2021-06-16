import React from 'react';
import "./Schedule.css";

import { easePolyOut } from "d3-ease";  //increases smoothness of the animations
import NodeGroup from "react-move/NodeGroup";

const gamesList = (props) => {

  const gameResultHandler = (game) => {
    let result;
    if(game.result === "W")
      result = <span className="gamesList_win">W</span>;
    else if(game.result === "L")
      result = <span className="gamesList_loss">L</span>;
    else if (game.result === "T")
      result = <span className="gamesList_other">T</span>;
    else if (game.result === "C")
      result = <span className="gamesList_other">Cancelled</span>; 
    else if(game.result === "n/a")
      result = <span className="gamesList_other">TBD</span>;

    return result;
  }

  const gameScoreHandler = (game) => {
    let gameScore;
    // have the Rockets score always be on the left
    if(game.hTeam.teamName === "Rockets")
      gameScore = game.hTeam.score + " - " + game.vTeam.score;
    else
      gameScore = game.vTeam.score + " - " + game.hTeam.score;
    
    return gameScore;
  }
  
  return (
    <NodeGroup
      data={props.whichGames}
      keyAccessor={data => data.gameId}
      start={() => (
        {opacity:0, x:-200}
      )}
      enter={(data, i) => (
        {opacity:[1], x:[0], timing:{duration:500, delay:i*50, ease:easePolyOut}}
      )}
      update={(data, i) => (
        {opacity:[1], x:[0], timing:{duration:500, delay:i*50, ease:easePolyOut}}
      )}
      leave={(data, i) => (
        {opacity:[0], x:[-200], timing:{duration:500, delay:i*50, ease:easePolyOut}}
      )}
    >
      {(nodes) => (
        <div>
          {nodes.map(({key, data, state:{x,opacity}}) => (
            <div className="gameList_block" style={{opacity, transform:`translate(${x}px)`}} key={key}>
              <div className="gameList_date">
                {data.startDateEastern}
              </div>
              
              <div className="gameList_opponent">
                <div className="atVersus">
                  {data.hTeam.teamName==="Rockets" ? "vs" : "@"}
                </div>
                <div className="teamIcon">
                  {data.hTeam.teamName==="Rockets" ?
                    <img src={require(`../../assets/nba_team_logos/${data.vTeam.teamName.toLowerCase()}.png`)} alt="icon"/>
                    : 
                    <img src={require(`../../assets/nba_team_logos/${data.hTeam.teamName.toLowerCase()}.png`)} alt="icon"/>}
                </div>
                {data.hTeam.teamName==="Rockets" ? data.vTeam.teamName : data.hTeam.teamName}
              </div>

              <div className="gameList_result">
                <div className="result_indicator">
                  {gameResultHandler(data)}
                </div>
                {(data.result==="n/a" || data.result==="C") ? 
                  null
                  :
                  gameScoreHandler(data)}
              </div>
            </div>
          ))}
        </div>
      )}
    </NodeGroup>
  );
};

export default gamesList;