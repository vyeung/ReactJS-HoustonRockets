import React from 'react';
import "./featured.css";

import Stripes from "./Stripes";
import Text from "./text";

const featured = () => {
  return (
    <div className="featured_wrapper">
      <Stripes />
      <Text />
    </div>
  );
};

export default featured;