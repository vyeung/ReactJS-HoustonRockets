import React, { Component } from 'react';
import "./Schedule.css";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from "@material-ui/core/CircularProgress";

//global hash map
const teamMap = new Map([
  ["1610612746", "Clippers"], ["1610612763", "Grizzlies"], ["1610612762", "Jazz"],
  ["1610612758", "Kings"], ["1610612747", "Lakers"], ["1610612742", "Mavericks"],
  ["1610612743", "Nuggets"], ["1610612740", "Pelicans"], ["1610612745", "Rockets"],
  ["1610612759", "Spurs"], ["1610612756", "Suns"], ["1610612760", "Thunder"],
  ["1610612750", "Timberwolves"], ["1610612757", "Trailblazers"], ["1610612744", "Warriors"]
]);

class ConfStandings extends Component {
  
  state = {
    isLoading: true,
    teamStandings: []
  }

  componentDidMount() {
    //using a CORS proxy to get around error
    fetch("https://cors-anywhere.herokuapp.com/http://data.nba.net/10s/prod/v1/current/standings_conference.json")
      .then(res => res.json())
      .catch(error => console.log(error))
        .then(data => {
          const teamData = data.league.standard.conference.west;
          this.setState({
            isLoading: false,
            teamStandings: teamData
          });
        })
  }

  render() {
    const regular = {
      color: "white",
      textAlign: "center",
      padding: "4px 11px",
      fontSize: "15px"
    };
    const black = {
      color: "white",
      textAlign: "center",
      padding: "4px 11px",
      fontSize: "15px",
      borderBottom: "1px solid black",
      borderBottomWidth: "medium"
    }

    return (
      <div className="conf_wrapper">
        <div className="conf_title">
          Western Conference Standings
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={regular}>Rank</TableCell>
              <TableCell style={regular}>Team</TableCell>
              <TableCell style={regular}>W</TableCell>
              <TableCell style={regular}>L</TableCell>
              <TableCell style={regular}>PCT</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.teamStandings.map((team, i) => (
              <TableRow key={i}>
                {/* black line shows cut off for playoff eligible teams */}
                {i===7 ? <TableCell style={black}>{i+1}</TableCell> 
                  : <TableCell style={regular}>{i+1}</TableCell>}
                {i===7 ? <TableCell style={black}>{teamMap.get(team.teamId)}</TableCell> 
                  : <TableCell style={regular}>{teamMap.get(team.teamId)}</TableCell>}
                {i===7 ? <TableCell style={black}>{team.win}</TableCell> 
                  : <TableCell style={regular}>{team.win}</TableCell>}
                {i===7 ? <TableCell style={black}>{team.loss}</TableCell> 
                  : <TableCell style={regular}>{team.loss}</TableCell>}
                {i===7 ? <TableCell style={black}>{team.winPct}</TableCell> 
                  : <TableCell style={regular}>{team.winPct}</TableCell>}
              </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <div className="conf_loading">
          {this.state.isLoading ? 
            <CircularProgress thickness={7} style={{color:"black", margin:"35px 0px 0px 0px"}} /> 
            : 
            null}
        </div>
      </div>
    );
  }
}

export default ConfStandings;