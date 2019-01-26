import React from 'react';
import "./recentGames.css";

import { Link } from "react-router-dom";
import Games from "./Games";

const recentGames = () => {
  return (
    <div className="recentG_main">
      <div className="recentG_center">
        <h2>Recent Games</h2>
        
        <Games />
        
        <div className="recentG_link">
          <Link to="/schedule">
            <p>See Full Schedule</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default recentGames;