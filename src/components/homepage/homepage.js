import React from 'react';
import "./homepage.css";

import Featured from "./featured/featured";
import RecentGames from "./recentGames/recentGames";
import ViewRoster from "./viewRoster/viewRoster";

const homepage = () => {
  return (
    <div className="home_wrapper">
      <Featured />
      <RecentGames />
      <ViewRoster />
    </div>
  );
};

export default homepage;