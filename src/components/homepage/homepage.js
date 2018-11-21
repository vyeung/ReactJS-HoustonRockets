import React from 'react';
import "./homepage.css";

import Featured from "./featured/featured";
import RecentGames from "./recentGames/recentGames";
import ViewRoster from "./viewRoster/viewRoster";
import WinJersey from "./winJersey/winJersey";

const homepage = () => {
  return (
    <div className="home_wrapper">
      <Featured />
      <RecentGames />
      <ViewRoster />
      <WinJersey />
    </div>
  );
};

export default homepage;