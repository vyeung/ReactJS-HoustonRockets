import React from 'react';
import "./featured.css";

import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";
import HardenFeatured from "../../../assets/otherImages/harden_featured.png";
import PaulFeatured from "../../../assets/otherImages/paul_featured.png";

const imgsText = () => {

  let animateHRockets = (
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

  let animatePlayers = (
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
            <img src={HardenFeatured} alt="harden" className="harden" />
            <img src={PaulFeatured} alt="paul" />
          </div>
        );
      }}
    </Animate>
  )

  return (
    <div className="imgsText_container">
      {animateHRockets}
      {animatePlayers}
    </div>
  );
}

export default imgsText;