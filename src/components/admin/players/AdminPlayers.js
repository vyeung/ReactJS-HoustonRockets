import React, { Component } from 'react';
import "./AdminPlayers.css";

import { Link } from "react-router-dom"
import { firebasePlayers } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";
import AdminLayout from "../../../hoc/adminLayout";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

class AdminPlayers extends Component {

  state = {
    isLoading: true,
    players: []
  }

  componentDidMount() {
    firebasePlayers.once("value")
      .then((snapshot) => {
        const formattedPlayers = firebaseLooper(snapshot);
        formattedPlayers.sort(this.compare);
        
        this.setState({
          isLoading: false,
          players: formattedPlayers
        });
      })
  }

  //sort alphabetically by lastname in descending order
  compare = (a,b) => {
    if(a.lastname < b.lastname)
      return -1;
    if(a.lastname > b.lastname)
      return 1;
    
    return 0;
  }

  render() {
    const titleSize = {fontSize: "30px"};
    const bodySize = {fontSize: "20px"};

    return (
      <AdminLayout>
        <div className="adminPlayers_editMsg">
          Click on a player name to edit
        </div>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={titleSize}>No.</TableCell>
                <TableCell style={titleSize}>NAME</TableCell>
                <TableCell style={titleSize}>POS</TableCell>
                <TableCell style={titleSize}>HT</TableCell>
                <TableCell style={titleSize}>WT</TableCell>
                <TableCell style={titleSize}>EXP</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.players ? 
                this.state.players.map((player, i) => (
                  <TableRow key={i}>
                    <TableCell style={bodySize}>
                      {player.jerseyNum}
                    </TableCell>
                    <TableCell style={bodySize}>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.firstname + " " + player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell style={bodySize}>
                      {player.position}
                    </TableCell>
                    <TableCell style={bodySize}>
                      {player.heightFt + "' " + player.heightIn}
                    </TableCell>
                    <TableCell style={bodySize}>
                      {player.weight} lbs
                    </TableCell>
                    <TableCell style={bodySize}>
                      {player.exp}
                    </TableCell>
                  </TableRow>
                ))
                :
                null}
            </TableBody>
          </Table>
        </Paper>

        <div className="adminPlayers_loading">
          {this.state.isLoading ? 
            <CircularProgress thickness={7} style={{color:"#d31145"}} /> 
            : 
            null}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;