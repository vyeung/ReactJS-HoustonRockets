import React from 'react';
import "./footer.css";
import RocketsLogo from "../utils/logo";

const footer = () => {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer_wrapper">
      <RocketsLogo isLink={false} width="70px" height="70px" />

      <div className="footer_description">
        Houston Rockets. {getCurrentYear()}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default footer;