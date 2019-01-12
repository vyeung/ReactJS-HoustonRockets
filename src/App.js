import React from 'react';
import './App.css';

import { Switch } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/homepage/homepage";
import Login from "./components/login/Login";

import Dashboard from "./components/admin/dashboard";
import AdminGames from "./components/admin/games/AdminGames";
import EditGame from "./components/admin/games/EditGame";
import AddGame from "./components/admin/games/AddGame";
import AdminPlayers from "./components/admin/players/AdminPlayers";

import PrivateRoute from "./components/authRoutes/privateRoutes";
import PublicRoute from "./components/authRoutes/publicRoutes";

const App = (props) => {

  return (
    <Layout>
      <Switch>
        {/*...props will include the userInfo prop from index.js*/}
        <PrivateRoute {...props} exact component={Dashboard} path="/dashboard" />
        <PrivateRoute {...props} exact component={AdminGames} path="/admin_games" />
        <PrivateRoute {...props} exact component={EditGame} path="/admin_games/edit_game/:id" />
        <PrivateRoute {...props} exact component={AddGame} path="/admin_games/add_game" />
        <PrivateRoute {...props} exact component={AdminPlayers} path="/admin_players" />

        <PublicRoute {...props} exact component={Login} path="/login" hasRestrictions={true} />
        <PublicRoute {...props} exact component={Home} path="/" hasRestrictions={false} />
      </Switch>
    </Layout>
  );
}

export default App;