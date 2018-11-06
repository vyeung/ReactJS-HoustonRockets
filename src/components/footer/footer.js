import React from 'react';
import "./footer.css";
import RocketsLogo from "../ui/logo";

const footer = () => {
  return (
    <footer className="footer_wrapper">
      <RocketsLogo isLink={false} width="70px" height="70px" />

      <div className="footer_description">
        Houston Rockets. 2018. All Rights Reserved.
      </div>
    </footer>
  );
};

export default footer;