import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from './utils/auth';
import PrivateRoute from './shared/PrivateRoute';
import PublicOnlyRoute from './shared/PublicOnlyRoute';

import GlobalState from './GlobalState';

import Login from './pages/Login';
import Lists from './pages/Lists';
import List from './pages/List';
import Logout from './pages/Logout';

/**
 * The App is the top-level component. This component should be used for...
 * - Creating the App Shell
 * - Setting up top-level Routing
 */
function App() {
  return (
    <main>
      <GlobalState>
        <Router>
          <Switch>
            {/* PUBLIC ROUTES */}
            <PublicOnlyRoute
              path="/login"
              redirectTo="/lists"
              isAuthenticated={isAuthenticated}
            >
              <Login />
            </PublicOnlyRoute>

            {/* PRIVATE ROUTES */}
            <PrivateRoute
              path="/lists"
              exact
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            >
              <Lists />
            </PrivateRoute>

            <PrivateRoute
              path="/lists/:listId"
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            >
              <List />
            </PrivateRoute>

            <PrivateRoute
              path="/logout"
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            >
              <Logout />
            </PrivateRoute>

            {/* When a User doesn't hit any of our defined routes, redirect them to the "/lists" route for now. */}
            <PrivateRoute
              path="*"
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            >
              <Redirect to="/lists" />
            </PrivateRoute>
          </Switch>
        </Router>
      </GlobalState>
    </main>
  );
}

export default App;
