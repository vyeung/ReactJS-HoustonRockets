import React from 'react';
import "./logo.css";
import { Link } from "react-router-dom";
import rocketsLogo from "../../assets/nba_team_logos/rockets.png";

const logo = (props) => {

  const template = (
    <div 
      className="img_wrapper" 
      style={{width:props.width, height:props.height}}
      >
      <img src={rocketsLogo} alt="logo" />
    </div>
  );

  //gives option to make logo a link or not
  if(props.isLink) {
    return (
      <Link to={props.linkTo}>
        {template}
      </Link>
    );
  }
  else {
    return template;
  }
};

export default logo;