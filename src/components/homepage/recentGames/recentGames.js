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

        <Link to="/games">
          <h3>See All Games</h3>
        </Link>
      </div>
    </div>
  );
};

export default recentGames;