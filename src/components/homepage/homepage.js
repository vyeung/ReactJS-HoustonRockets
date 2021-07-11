import React from 'react';
import "./homepage.css";

import Featured from "./featured/featured";
import RecentGames from "./recentGames/recentGames";
import ViewRoster from "./viewRoster/viewRoster";
import WinJersey from "./winJersey/winJersey";

const goToTop = () => {
  window.scrollTo(0, 0);
}

const homepage = () => {
  return (
    <div className="home_wrapper">
      {goToTop()}
      <Featured />
      <RecentGames />
      <ViewRoster />
      <WinJersey />
    </div>
  );
};

export default homepage;