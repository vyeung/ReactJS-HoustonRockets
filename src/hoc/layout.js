import React from 'react';
import Header from "../components/header/Header";

const layout = (props) => {
  return (
    //always render header and footer on each route
    <div>
      <Header />
      {props.children}
    </div>
  );
};

export default layout;