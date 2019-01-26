import React, { Component } from 'react';
import "./Schedule.css";

import { firebaseGames } from "../../firebase";
import firebaseLooper from "../utils/firebaseLooper";
import convertDate from "../utils/convertDate";

import ConfStandings from "./ConfStandings";
import GamesList from "./gamesList";

class Schedule extends Component {

  state = {
    isLoading: true,
    games: [],
    filteredGames: [],

    //we are only doing 1 filter at a time, not both.
    //have both filters start on "All"
    playedFilter: "All",
    resultFilter: "All"
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    firebaseGames.once("value")
      .then(snapshot => {
        const formattedGames = firebaseLooper(snapshot);

        //sort by date
        formattedGames.sort((a, b) => {
          return a.date.localeCompare(b.date);
        })

        //now convert the date
        for(let key in formattedGames) {
          formattedGames[key].date = convertDate(formattedGames[key].date);
        }

        this.setState({
          isLoading: false,
          games: formattedGames,
          filteredGames: formattedGames //default is to show all games on page load
        });
      })
  }

  showPlayedHandler = (selection) => {
    let list = null;

    if(selection === "All") {
      list = this.state.games;
    }
    else if(selection === "Played") {
      list = this.state.games.filter((game) => {
        //a Played game cannot have been TBD or Cancelled
        return !(game.result==="n/a" || game.result==="C");
      });
    }
    else if(selection === "Not Played") {
      list = this.state.games.filter((game) => {
        //a Not Played game has been TBD or Cancelled
        return (game.result==="n/a" || game.result==="C");
      });
    }
    else if(selection === "Home") {
      list = this.state.games.filter((game) => {
        //don't include TBD or Cancelled games
        return (game.home==="Rockets") && !(game.result==="n/a" || game.result==="C");
      });
    }
    else if(selection === "Away") {
      list = this.state.games.filter((game) => {
        //don't include TBD or Cancelled games
        return (game.home!=="Rockets") && !(game.result==="n/a" || game.result==="C");
      });
    }

    this.setState({
      filteredGames: list,
      playedFilter: selection,
      resultFilter: "All"  //selecting any played options resets resultFilter to "All"
    })
  }

  showResultHandler = (selection) => {
    let list = null;

    if(selection === "All") {
      list = this.state.games;
    }
    else if(selection === "W") {
      list = this.state.games.filter((game) => {
        return game.result === "W";
      });
    }
    else if(selection === "L") {
      list = this.state.games.filter((game) => {
        return game.result === "L";
      });
    }

    this.setState({
      filteredGames: list,
      playedFilter: "All",  //same as showPlayedHandler but backwards
      resultFilter: selection
    })
  }

  render() {
    return (
      <div className="schedule_container">   
        <div className="schedule_left">
          <div className="schedule_filters">
            
            <div className="filter_box">
              <div className="filter_title">
                Games Played Filter
              </div>
              <div className="filter_options">
                {/*not having ()=> on the onClick, triggers function w/o making a click anyway*/}
                {/*the ternary tells whether "myActive" should be added as an additional className or not*/}
                <div className={`filter_option ${this.state.playedFilter === "All" ? "myActive" : ""}`} 
                  onClick={()=>this.showPlayedHandler("All")}>
                  All
                </div>
                <div className={`filter_option ${this.state.playedFilter === "Played" ? "myActive" : ""}`} 
                  onClick={()=>this.showPlayedHandler("Played")}>
                  Played
                </div>
                <div className={`filter_option ${this.state.playedFilter === "Not Played" ? "myActive" : ""}`} 
                  onClick={()=>this.showPlayedHandler("Not Played")}>
                  Not Played
                </div>
                <div className={`filter_option ${this.state.playedFilter === "Home" ? "myActive" : ""}`} 
                  onClick={()=>this.showPlayedHandler("Home")}>
                  Home
                </div>
                <div className={`filter_option ${this.state.playedFilter === "Away" ? "myActive" : ""}`} 
                  onClick={()=>this.showPlayedHandler("Away")}>
                  Away
                </div>
              </div>
            </div>
            
            <div className="filter_box">
              <div className="filter_title">
                Result Filter
              </div>
              <div className="filter_options">
                <div className={`filter_option ${this.state.resultFilter === "All" ? "myActive" : ""}`} 
                  onClick={()=>this.showResultHandler("All")}>
                  All
                </div>
                <div className={`filter_option ${this.state.resultFilter === "W" ? "myActive" : ""}`} 
                  onClick={()=>this.showResultHandler("W")}>
                  W
                </div>
                <div className={`filter_option ${this.state.resultFilter === "L" ? "myActive" : ""}`} 
                  onClick={()=>this.showResultHandler("L")}>
                  L
                </div>
              </div>
            </div>
          </div>

          <GamesList whichGames={this.state.filteredGames} />
        </div>

        <div className="schedule_right">
          <ConfStandings />
        </div>
      </div>
    );
  }
}

export default Schedule;