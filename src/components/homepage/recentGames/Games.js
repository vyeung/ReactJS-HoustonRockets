import React, { Component } from 'react';
import "./recentGames.css";

import { firebaseGames } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";
import convertDate from "../../utils/convertDate";

import GameBlock from "../../utils/gameBlock";
import Slide from "react-reveal/Slide";

class Games extends Component {

  state = {
    games: []
  }

  componentDidMount() {
    //firebase get request
    firebaseGames.once("value")
      .then((snapshot) => {
        const formattedGames = firebaseLooper(snapshot);
        
        //sort by date
        formattedGames.sort((a, b) => {
          return a.date.localeCompare(b.date);
        })

        //now convert the date
        for(let key in formattedGames) {
          formattedGames[key].date = convertDate(formattedGames[key].date);
        }

        let displayedGames = [];
        let naPosition = 0;
        
        //want to show a max of 6 recent games
        for(var i=0; i<formattedGames.length; i++) {
          
          //2 major code blocks are when formattedGames.length is <= or > 6
          if(formattedGames.length <= 6) {
            if(formattedGames[i].result === "n/a") {
              if(naPosition === 0) {
                break;
              }
              else if(naPosition === 1) {
                displayedGames[0] = formattedGames[i-1];
                break;
              }
              else if(naPosition === 2) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                break;
              }
              else if(naPosition === 3) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                break;
              }
              else if(naPosition === 4) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                displayedGames[3] = formattedGames[i-4];
                break;
              }
              else if(naPosition === 5) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                displayedGames[3] = formattedGames[i-4];
                displayedGames[4] = formattedGames[i-5];
                break;
              }
            }
            else if(i===formattedGames.length-1 && displayedGames.length===0) {
              displayedGames[0] = formattedGames[i];
              displayedGames[1] = formattedGames[i-1];
              displayedGames[2] = formattedGames[i-2];
              displayedGames[3] = formattedGames[i-3];
              displayedGames[4] = formattedGames[i-4];
              displayedGames[5] = formattedGames[i-5];
            }
          }
          else if(formattedGames.length > 6) {
            //cases where season just started but user added many games ahead
            if(formattedGames[i].result==="n/a" && naPosition<=6) {
              if(naPosition === 0) {
                break;
              }
              else if(naPosition === 1) {
                displayedGames[0] = formattedGames[i-1];
                break;
              }
              else if(naPosition === 2) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                break;
              }
              else if(naPosition === 3) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                break;
              }
              else if(naPosition === 4) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                displayedGames[3] = formattedGames[i-4];
                break;
              }
              else if(naPosition === 5) {
                displayedGames[0] = formattedGames[i-1];
                displayedGames[1] = formattedGames[i-2];
                displayedGames[2] = formattedGames[i-3];
                displayedGames[3] = formattedGames[i-4];
                displayedGames[4] = formattedGames[i-5];
                break;
              }
            }
            //most regular case
            else if(formattedGames[i].result==="n/a" && naPosition>6) {
              displayedGames[0] = formattedGames[i-1];
              displayedGames[1] = formattedGames[i-2];
              displayedGames[2] = formattedGames[i-3];
              displayedGames[3] = formattedGames[i-4];
              displayedGames[4] = formattedGames[i-5];
              displayedGames[5] = formattedGames[i-6];
              break;
            }
            //case where all games in season have been played so no "n/a" left.
            //we're at end of formattedGames and displayedGames length still = 0
            else if(i===formattedGames.length-1 && displayedGames.length===0) {
              displayedGames[0] = formattedGames[i];
              displayedGames[1] = formattedGames[i-1];
              displayedGames[2] = formattedGames[i-2];
              displayedGames[3] = formattedGames[i-3];
              displayedGames[4] = formattedGames[i-4];
              displayedGames[5] = formattedGames[i-5];
            }
          }

          naPosition++;         
        }

        this.setState({
          //reverse array so games are in ascending order again
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