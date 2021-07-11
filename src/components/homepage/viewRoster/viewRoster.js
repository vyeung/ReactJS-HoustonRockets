import React from 'react';
import "./viewRoster.css";

import { Link } from "react-router-dom";
import PlayerCard from "../../utils/playerCard";
import GenericNoPic from "../../../assets/otherImages/genericNoPic.png";
import Fade from "react-reveal/Fade";

const viewRoster = () => {

  return (
    <Fade fraction={0.4}>
      <div className="viewRoster_main">
        <div className="viewRoster_center">
          <div className="viewRoster_content">
            <div className="viewRoster_cardstack">
              {/*cards 1,2,3 are just dummy filler cards*/}
              <div className="card1">
                <PlayerCard number="15" bck={GenericNoPic} />
              </div>
              <div className="card2">
                <PlayerCard number="10" bck={GenericNoPic} />
              </div>
              <div className="card3">
                <PlayerCard number="17" bck={GenericNoPic} />
              </div>
              <div className="card4">
                <PlayerCard 
                  number="13"
                  firstname="Player"
                  lastname="Name"
                  height="6' 5"
                  weight="220"
                  exp="5"
                  bck={GenericNoPic} 
                />
              </div>
            </div>

            <div className="viewRoster_textSection">
              <div className="view">
                View
              </div>
              <div className="the">
                The
              </div>
              <div className="roster">
                Roster
              </div>
              <div className="rosterLink">
                <Link to="roster">
                  Click here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default viewRoster;