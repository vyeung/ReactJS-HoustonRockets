import React from 'react';
import './App.css';

import { Switch, Route } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/homepage/homepage";

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route exact component={Home} path="/" />
      </Switch>
    </Layout>
  );
}

export default App;