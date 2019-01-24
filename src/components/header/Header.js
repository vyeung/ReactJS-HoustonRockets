import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RocketsLogo from "../utils/logo";
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
      fontSize: "1.3em"
    };

    return (
      <AppBar position="fixed" style={appBarStyle}>
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
          <div > 
            <RocketsLogo isLink={true} linkTo="/" width="60px" height="70px" />
          </div>

          <div>
            <Link to="/roster">
              <Button style={buttonStyles}>Roster</Button>
            </Link>
            <Link to="/games">
              <Button style={buttonStyles}>Games</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;