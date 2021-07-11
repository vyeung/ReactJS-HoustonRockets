import React from 'react';
import "./featured.css";

import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import FeaturedPlayer1 from "../../../assets/otherImages/featured_player_1.png";
import FeaturedPlayer2 from "../../../assets/otherImages/featured_player_2.png";

const imgsText = () => {

  let animateHoustonRockets = (
    <Animate
      show={true}
      start={{
        opacity: 0,
        rotate: 0
      }}
      enter={{
        opacity: [1],
        rotate: [360],
        timing: {duration: 1000, ease: easePolyOut}
      }}
    >
      {({opacity, rotate}) => {
        return (
          <div className="imgsText_hrockets_wrapper">
            <div 
              className="imgsText_hrockets"
              style={{
                opacity,
                transform: `rotateY(${rotate}deg)`  //360 spin effect
              }}
            >
              HOUSTON ROCKETS
            </div>
          </div>
        );
      }}
    </Animate>
  )

  let animateFeaturedPlayers = (
    <Animate
      show={true}
      start={{
        opacity: 0
      }}
      enter={{
        opacity: [1],
        timing: {delay: 800, duration: 1000, ease: easePolyOut}
      }}
    >
      {({opacity}) => {
        return (
          <div className="imgsText_players" style={{opacity}}>
            <img src={FeaturedPlayer1} alt="player1" className="player1" />
            <img src={FeaturedPlayer2} alt="player2" />
          </div>
        );
      }}
    </Animate>
  )

  return (
    <div className="imgsText_container">
      {animateHoustonRockets}
      {animateFeaturedPlayers}
    </div>
  );
}

export default imgsText;