import React from 'react';
import "./adminLayout.css";

import { NavLink } from "react-router-dom";
import { firebase } from "../firebase";

const adminLayout = (props) => {

  const logoutHandler = () => {
    firebase.auth().signOut()
      .then(() => {
        console.log("User logged out");
      })
      .catch(() => {
        console.log("Error logging out");
      })
  }

  return (
    <div className="admin_container">
      <div className="admin_left">
        <NavLink to="/admin_players" className="admin_NavLink">
          Players
        </NavLink>

        <NavLink to="/admin_players/add_player" className="admin_NavLink">
          Add Player
        </NavLink>

        <NavLink to="/login" className="admin_NavLink" onClick={() => logoutHandler()}>
          Logout
        </NavLink>
      </div>

      <div className="admin_right">
        {props.children}
      </div>
    </div>
  );
};

export default adminLayout;