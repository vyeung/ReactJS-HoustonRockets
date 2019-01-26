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
  
  return (
    <NodeGroup
      data={props.whichGames}
      keyAccessor={data => data.id}
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
                {data.date}
              </div>
              
              <div className="gameList_opponent">
                <div className="atVersus">
                  {data.away==="Rockets" ? "@  " : "vs"}
                </div>
                <div className="teamIcon">
                  {data.away==="Rockets" ? 
                    <img src={require(`../../assets/nba_team_logos/${data.homeThmb}.png`)} alt="icon"/>
                    :
                    <img src={require(`../../assets/nba_team_logos/${data.awayThmb}.png`)} alt="icon"/>}
                </div>
                {data.away==="Rockets" ? data.home : data.away}
              </div>

              <div className="gameList_result">
                <div className="result_indicator">
                  {gameResultHandler(data)}
                </div>
                {(data.result==="n/a" || data.result==="C") ? 
                  null
                  :
                  `${data.awayScore} - ${data.homeScore}`}
              </div>
            </div>
          ))}
        </div>
      )}
    </NodeGroup>
  );
};

export default gamesList;