import React from 'react';
import "./homepage.css";

import Featured from "./featured/featured";
import RecentGames from "./recentGames/recentGames";

const homepage = () => {
  return (
    <div className="home_wrapper">
      <Featured />
      <RecentGames />
    </div>
  );
};

export default homepage;