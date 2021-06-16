import React, { Component } from 'react';
import "./Schedule.css";

import convertDate from "../utils/convertDate";
import getTeamName from "../utils/getTeamName";

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

    const year = new Date().getFullYear()-1;
    const nbaSchedule = `http://data.nba.net/data/prod/v1/${year}/teams/rockets/schedule.json`;

    fetch("https://cors-anywhere.herokuapp.com/" + nbaSchedule)
      .then(res => res.json())
      .catch(error => console.log(error))
        .then(data => {
          const teamData = data.league.standard;
          const seasonGames = [];

          for (let obj in teamData) {
            // skipping preason games, which are seasonStageId=1
            if (teamData[obj].seasonStageId === 1) {
              continue;
            }

            // seasonStageId=2 is regular season, seasonStageId=4 is playoffs
            if (teamData[obj].seasonStageId === 2 || teamData[obj].seasonStageId === 4) {
              // determine if game was n/a, W, or L
              if (teamData[obj].hTeam.score === "" || teamData[obj].vTeam.score === "") {
                teamData[obj].result = "n/a";  //add a new result field to each game
              }
              else if (teamData[obj].isHomeTeam === true) {
                if (teamData[obj].hTeam.score > teamData[obj].vTeam.score)
                  teamData[obj].result = "W";
                else
                  teamData[obj].result = "L";
              }
              else if (teamData[obj].isHomeTeam === false) {
                if (teamData[obj].vTeam.score > teamData[obj].hTeam.score)
                  teamData[obj].result = "W";
                else
                  teamData[obj].result = "L";
              }

              teamData[obj].startDateEastern = convertDate(teamData[obj].startDateEastern);
              teamData[obj].hTeam.teamName = getTeamName(teamData[obj].hTeam.teamId);
              teamData[obj].vTeam.teamName = getTeamName(teamData[obj].vTeam.teamId);

              seasonGames.push(teamData[obj]);
            }
          }

          this.setState({
            isLoading: false,
            games: seasonGames,
            filteredGames: seasonGames // default is to show all games on page load
          });
        });
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
        return (game.hTeam.teamName==="Rockets") && !(game.result==="n/a" || game.result==="C");
      });
    }
    else if(selection === "Away") {
      list = this.state.games.filter((game) => {
        //don't include TBD or Cancelled games
        return (game.hTeam.teamName!=="Rockets") && !(game.result==="n/a" || game.result==="C");
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