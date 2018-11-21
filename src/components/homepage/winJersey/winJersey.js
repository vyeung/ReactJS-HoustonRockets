import React from 'react';
import "./winJersey.css";

import CustomJersey from "../../../assets/otherImages/custom_jersey.png";
import Enroll from "./Enroll";
import Zoom from "react-reveal/Zoom";

const winJersey = () => {
  return (
    <div className="promo_main">
      <div className="promo_center">
        <Zoom>
          <div className="promo_animations">
            <div className="promo_left">
                <span>WIN A</span>
                <span>CUSTOM</span>
                <span>JERSEY</span>
            </div>
            <div className="promo_right">
              <img src={CustomJersey} alt="jersey" />
            </div>
          </div>
        </Zoom>

        <Enroll />
      </div>
    </div>
  );
};

export default winJersey;