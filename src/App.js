import React from 'react';
import './App.css';

import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/homepage/homepage";
import Login from "./components/login/Login";
import Dashboard from "./components/admin/dashboard";

const App = (props) => {
  
  return (
    <Layout>
      <Switch>
        <Route exact component={Dashboard} path="/dashboard" />
        <Route exact component={Login} path="/login" />
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
}

export default App;