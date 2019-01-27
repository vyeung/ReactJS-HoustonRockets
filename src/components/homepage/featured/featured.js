import React from 'react';
import "./featured.css";

import Stripes from "./Stripes";
import ImgsText from "./imgsText";

const featured = () => {
  return (
    <div className="featured_wrapper">
      <Stripes />
      <ImgsText />
    </div>
  );
};

export default featured;