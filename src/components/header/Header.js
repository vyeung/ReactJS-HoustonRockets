import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RocketsLogo from "../ui/logo";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const appBarStyle = {
      backgroundColor: "#d31145",
      boxShadow: "none",
      padding: "5px 0px",
      borderBottom: "2px solid black"
    };

    const buttonStyles = {
      color: "inherit",
      fontSize: "1em"
    };

    return (
      <AppBar position="fixed" style={appBarStyle}>
        <Toolbar style={{display:"flex"}}>
          {/*flexGrow makes the 2 links below align to the right*/}
          <div style={{flexGrow: 1}}> 
            <RocketsLogo isLink={true} linkTo="/" width="70px" height="70px" />
          </div>

          <Link to="/roster">
            <Button style={buttonStyles}>Roster</Button>
          </Link>

          <Link to="/games">
            <Button style={buttonStyles}>Games</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;