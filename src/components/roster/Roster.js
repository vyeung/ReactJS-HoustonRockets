import React, { Component } from 'react';
import "./Roster.css";

import { firebase, firebasePlayers } from "../../firebase";
import firebaseLooper from "../utils/firebaseLooper";
import { Promise } from "core-js";

import PlayerCard from "../utils/playerCard";
import Fade from "react-reveal/Fade";

class Roster extends Component {

  state = {
    isLoading: true,
    players: []
  }

  componentDidMount() {
    //make scroll bar start at the top of page
    window.scrollTo(0, 0);

    firebasePlayers.once("value")
      .then(snapshot => {
        const formattedPlayers = firebaseLooper(snapshot);
        let promises = [];

        //technique that makes sure we have all the fileURLs before using them.
        //otherwise, app can crash if the renders happen too quickly and we don't 
        //have the fileURLs yet.
        for(let key in formattedPlayers) {
          promises.push(
            new Promise((resolve, reject) => {
              firebase.storage().ref("playerImgs").child(formattedPlayers[key].image).getDownloadURL()
                .then(url => {
                  formattedPlayers[key].fileURL = url; //adding fileURL field to obj
                  resolve(); //must go at end
                })
            })
          );
        }

        //wait until all promises are resolved before we setState
        Promise.all(promises)
          .then(() => {
            formattedPlayers.sort(this.compare);  //sort players by lastname
            this.setState({
              isLoading: false,
              players: formattedPlayers
            });
          })
      })
  }

  compare = (a,b) => {
    if(a.lastname < b.lastname)
      return -1;
    if(a.lastname > b.lastname)
      return 1;
    return 0;
  }

  showPlayersByPosition = (pos) => {
    let playerGroup = null;

    if(this.state.players) {
      playerGroup = (
        this.state.players.map((player, i) => (
          player.position === pos ?
            <Fade left key={i}>
              <div className="roster_player">
                <PlayerCard 
                  bck={player.fileURL}
                  firstname={player.firstname}
                  lastname={player.lastname}
                  height={player.heightFt + "' " + player.heightIn}
                  weight={player.weight}
                  exp={player.exp}
                  number={player.jerseyNum}
                />
              </div>
            </Fade>
            :
            null
        ))
      );
    }
    return playerGroup;
  }

  render() {
    return (
      <div className="roster_container">
        {!this.state.isLoading ?
          <div className="roster_grouping">
            <div className="roster_title">Centers</div>
            <div className="roster_cards">
              {this.showPlayersByPosition("C")}
            </div>
          </div>
          :null
        }
        {!this.state.isLoading ?
          <div className="roster_grouping">
            <div className="roster_title">Point Guards</div>
            <div className="roster_cards">
              {this.showPlayersByPosition("PG")}
            </div>
          </div>
          :null
        }
        {!this.state.isLoading ?
          <div className="roster_grouping">
            <div className="roster_title">Shooting Guards</div>
            <div className="roster_cards">
              {this.showPlayersByPosition("SG")}
            </div>
          </div>
          :null
        }
        {!this.state.isLoading ?
          <div className="roster_grouping">
            <div className="roster_title">Power Forwards</div>
            <div className="roster_cards">
              {this.showPlayersByPosition("PF")}
            </div>
          </div>
          :null
        }
        {!this.state.isLoading ?
          <div className="roster_grouping">
            <div className="roster_title">Small Forwards</div>
            <div className="roster_cards">
              {this.showPlayersByPosition("SF")}
            </div>
          </div>
          :null
        }
      </div>
    );
  }
}

export default Roster;