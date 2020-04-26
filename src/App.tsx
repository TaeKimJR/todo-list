import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Lists from './pages/Lists';
import List from './pages/List';

/**
 * The App is the top-level component. This component should be used for...
 * - Creating the App Shell
 * - Setting up top-level Routing
 */
function App() {
  return (
    <main>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/lists" exact>
            <Lists />
          </Route>
          <Route path="/lists/:listId">
            <List />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
