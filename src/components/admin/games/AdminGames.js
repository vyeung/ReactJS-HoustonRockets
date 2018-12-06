import React, { Component } from 'react';
import "./AdminGames.css";

import { Link } from "react-router-dom"
import { firebaseGames } from "../../../firebase";
import firebaseLooper from "../../utils/firebaseLooper";
import AdminLayout from "../../../hoc/adminLayout";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CircularProgress from '@material-ui/core/CircularProgress';

class AdminGames extends Component {

  state = {
    isLoading : true,
    games: []
  }

  componentDidMount() {
    firebaseGames.once("value")
      .then((snapshot) => {
        const formattedGames = firebaseLooper(snapshot);
        this.setState({
          isLoading: false,
          games: formattedGames
        });
      })
  }

  gameResultHandler = (game) => {
    let result;
    if(game.result === "W")
      result = <span className="admin_winResult">Win</span>;
    else if(game.result === "L")
      result = <span className="admin_lossResult">Loss</span>;
    else if (game.result === "T")
      result = <span className="admin_otherResult">Tie</span>;
    else if (game.result === "C")
      result = <span className="admin_otherResult">Cancelled</span>; 
    else if(game.result === "n/a")
      result = <span className="admin_otherResult">TBD</span>;

    return result;
  }

  render() {
    const titleSize = {fontSize: "30px"};
    const bodySize = {fontSize: "20px"};

    return (
      <AdminLayout>
        <div className="admin_editMsg">
          Click on a game to edit info
        </div>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={titleSize}>Date</TableCell>
                <TableCell style={titleSize}>Game</TableCell>
                <TableCell style={titleSize}>Score</TableCell>
                <TableCell style={titleSize}>Result</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.games ? 
                this.state.games.map((game, i) => (
                  <TableRow key={i}>
                    <TableCell style={bodySize}>
                      {game.date}
                    </TableCell>
                    <TableCell style={bodySize}>
                      <Link to={`/admin_games/edit_game/${game.id}`}>
                        {game.away} @ {game.home}
                      </Link>
                    </TableCell>
                    <TableCell style={bodySize}>
                      {game.awayScore} - {game.homeScore}
                    </TableCell>
                    <TableCell style={bodySize}>
                      {this.gameResultHandler(game)}
                    </TableCell>
                  </TableRow>
                ))
                :
                null}
            </TableBody>
          </Table>
        </Paper>

        <div className="admin_loading">
          {this.state.isLoading ? 
            <CircularProgress thickness={7} style={{color:"#d31145"}} /> 
            : 
            null}
        </div>
      </AdminLayout>
    );
  }
}

export default AdminGames;