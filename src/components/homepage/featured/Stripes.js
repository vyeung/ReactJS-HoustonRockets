import React, { Component } from 'react';
import "./featured.css";

import { easePolyOut } from "d3-ease";
import Animate from "react-move/Animate";

class Stripes extends Component {
  
  state = {
    stripes: [
      {
        //top, left are in percents
        background: "#d31145",
        left: 90,
        top: -30,
        rotate: 25,
        delay: 0
      },
      {
        background: "grey",
        left: 195,
        top: -40,
        rotate: 25,
        delay: 200
      },
      {
        background: "#d31145",
        left: 300,
        top: -50,
        rotate: 25,
        delay: 400
      }
    ]
  };

  //using => () since we have jsx in showStripes
  showStripes = () => (
    this.state.stripes.map((stripe, i) => (
      <Animate 
        key={i} 
        show={true} 
        start={{
          background: "#ffffff",
          opacity: 0,
          left: 0,
          top: 0,
          rotate: 25,
          delay: 0
        }}
        enter={{
          background: `${stripe.background}`,
          opacity: [1],
          left: [stripe.left],
          top: [stripe.top],
          rotate: [stripe.rotate],
          timing: {delay:stripe.delay, duration:200, ease:easePolyOut}
        }}
      >
        {/*Animate must return a function with a div*/}
        {({background, opacity, left, top, rotate}) => {
          return (
            <div
              className="stripe"
              style={{
                background,
                opacity,
                transform: `rotate(${rotate}deg) translate(${left}%, ${top}%)` //rotate first, then move
              }} 
            >
            </div>  
          );
        }}
      </Animate>
    ))
  )

  render() {
    return (
      <div className="featured_stripes">
        {this.showStripes()}
      </div>
    );
  }
}

export default Stripes;