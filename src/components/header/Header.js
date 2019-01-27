import React, { Component } from 'react';
import "./Header.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import RocketsLogo from "../utils/logo";
import { Link } from "react-router-dom";
import { firebase } from "../../firebase";

import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import SideDrawer from "./sideDrawer";

class Header extends Component {

  state = {
    openDrawer: false
  }

  checkAuth = () => {
    var user = firebase.auth().currentUser;
    if(user)
      return true;  //we have a logged in admin user
    else
      return false; //we don't have a logged in admin user
  }

  toggleDrawerHandler = (value) => {
    this.setState({openDrawer: value});
  }

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

          <div className="desktop_version">
            <Link to="/roster">
              <Button style={buttonStyles}>Roster</Button>
            </Link>
            <Link to="/schedule">
              <Button style={buttonStyles}>Schedule</Button>
            </Link>

            {/*only logged in admin users can see dashboard link*/}
            {this.checkAuth() ?
              <Link to="/dashboard">
                <Button style={buttonStyles}>Dashboard</Button>
              </Link>
              :
              null}
          </div>

          <div className="mobile_version">
            <IconButton 
              color="inherit" 
              aria-label="Menu" 
              onClick={()=>this.toggleDrawerHandler(true)}
            >
              <MenuIcon />
            </IconButton>

            <SideDrawer
              openDrawer={this.state.openDrawer}
              onCloseProp={(value) => this.toggleDrawerHandler(value)} 
              isAuth={this.checkAuth() ? true : false}
            />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;