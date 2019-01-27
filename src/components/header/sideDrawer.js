import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

//gets rid of a warning when using Drawer
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const newStyles = {
  //Drawer doesn't have a root element (see docs), so can't use inline-style
  drawerChanges: {
    width: "40%",
    backgroundColor: "#d31145",
    color: "white"
  },
  listChanges: {
    fontSize: "20px",
    padding: 0
  },
  listItemChanges: {
    paddingTop: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #2e2a2a"
  }
};

const sideDrawer = (props) => {
  
  //using override with classes (see docs)
  const {classes} = props;
  
  return (
    <Drawer 
      classes={{paper:classes.drawerChanges}} 
      anchor="right" 
      open={props.openDrawer} 
      onClose={() => props.onCloseProp(false)}
    >  
      <List classes={{root:classes.listChanges}} component="nav">
        <Link to="/roster">
          <ListItem 
            classes={{root:classes.listItemChanges}} 
            onClick={() => props.onCloseProp(false)}>
            Roster
          </ListItem>
        </Link>
        
        <Link to="/schedule">
          <ListItem 
            classes={{root:classes.listItemChanges}} 
            onClick={() => props.onCloseProp(false)}>
            Schedule
          </ListItem>
        </Link>
        
        {props.isAuth ? 
          <Link to="/dashboard">
            <ListItem 
              classes={{root:classes.listItemChanges}} 
              onClick={() => props.onCloseProp(false)}>
              Dashboard
            </ListItem>
          </Link>
          :
          null}
      </List>
    </Drawer>
  );
};

export default withStyles(newStyles) (sideDrawer);