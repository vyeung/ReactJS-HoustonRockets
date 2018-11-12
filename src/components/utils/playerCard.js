import React from 'react';
import "./playerCard.css";

const playerCard = (props) => {
  return (
    <div className="playerCard_wrapper">
      <div className="playerCard_pic" >
        <img src={props.bck} alt="player"/>
      </div>
      
      <div className="playerCard_name">
        {props.firstname + " " + props.lastname}
      </div>
      
      <div className="playerCard_otherInfo">
        <div className="playerCard_vals">
          <div className="playerCard_ht">
            {"HT: " + props.height}
          </div>
          <div className="playerCard_wt">
            {"WT: " + props.weight}
          </div>
          <div className="playerCard_exp">
            {"EXP: " + props.exp}
          </div>
        </div>
        <div className="playerCard_num">
          {"#" + props.number}
        </div>
      </div>
   </div>
  );
};

export default playerCard;