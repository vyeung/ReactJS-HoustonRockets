import React from 'react';
import './App.css';

import { Switch } from "react-router-dom";
import Layout from "./hoc/layout";
import Home from "./components/homepage/homepage";
import Login from "./components/login/Login";
import Roster from "./components/roster/Roster";
import Schedule from "./components/schedule/Schedule";
import NotFound from "./components/notFound/notFound";

import Dashboard from "./components/admin/dashboard";
import AdminPlayers from "./components/admin/players/AdminPlayers";
import EditPlayer from "./components/admin/players/EditPlayer";
import AddPlayer from "./components/admin/players/AddPlayer";

import PrivateRoute from "./components/authRoutes/privateRoutes";
import PublicRoute from "./components/authRoutes/publicRoutes";

const App = (props) => {

  return (
    <Layout>
      <Switch>
        {/*...props will include the userInfo prop from index.js*/}
        <PrivateRoute {...props} exact component={Dashboard} path="/dashboard" />
        <PrivateRoute {...props} exact component={AdminPlayers} path="/admin_players" />
        <PrivateRoute {...props} exact component={EditPlayer} path="/admin_players/edit_player/:id" />
        <PrivateRoute {...props} exact component={AddPlayer} path="/admin_players/add_player" />

        <PublicRoute {...props} exact component={Login} path="/login" hasRestrictions={true} />
        <PublicRoute {...props} exact component={Roster} path="/roster" hasRestrictions={false} />
        <PublicRoute {...props} exact component={Schedule} path="/schedule" hasRestrictions={false} />
        <PublicRoute {...props} exact component={Home} path="/" hasRestrictions={false} />
      
        <PublicRoute {...props} component={NotFound} hasRestrictions={false} />
      </Switch>
    </Layout>
  );
}

export default App;