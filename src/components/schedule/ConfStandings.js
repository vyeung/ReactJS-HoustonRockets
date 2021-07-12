import React, { Component } from 'react';
import "./Schedule.css";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from "@material-ui/core/CircularProgress";
import getTeamName from '../utils/getTeamName';

class ConfStandings extends Component {
  
  state = {
    isLoading: true,
    teamStandings: []
  }

  componentDidMount() {
    fetch("https://data.nba.net/prod/v1/current/standings_conference.json")
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
      padding: "13px 11px",
      fontSize: "15px"
    };
    const black = {
      color: "white",
      textAlign: "center",
      padding: "13px 11px",
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
                {i===7 ? <TableCell style={black}>{getTeamName(team.teamId)}</TableCell> 
                  : <TableCell style={regular}>{getTeamName(team.teamId)}</TableCell>}
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