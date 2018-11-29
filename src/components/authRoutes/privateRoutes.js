import React from 'react';
import { Route, Redirect } from "react-router-dom";

/*
in the destructuring, we want 3 things:
  1. userInfo
  2. rename component to Component
  3. the restOfRouteProps like path, exact
*/
const privateRoutes = ({userInfo, component: Component, ...restOfRouteProps}) => {

  return (
    <Route 
      {...restOfRouteProps}

      //Route can pass "render" or "component" as a prop.
      //props used here is from react-router (e.g. history) and different from restOfRouteProps. 
      render={(props) => (
        //prevent unauthorized users from accessing Component (Dashboard)
        userInfo ? <Component {...props} /> : <Redirect to="/login" />
      )}
    />
  );
};

export default privateRoutes;