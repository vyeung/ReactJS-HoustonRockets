import React from 'react';
import { Route, Redirect } from "react-router-dom";

const publicRoutes = ({userInfo, component: Component, ...restOfRouteProps}) => {

  return (
    <Route
      {...restOfRouteProps}

      render={(props) => (
        restOfRouteProps.hasRestrictions ? 
          //if user is already logged in, no need for them to access login screen
          (userInfo ? <Redirect to="/dashboard" /> : <Component {...props} />)
          :
          <Component {...props} />
      )}
    />
  );
};

export default publicRoutes;