import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

test('redirects when an unauthenticated User accesses a Private Route', () => {
  let location: RouteComponentProps['location'];

  const isAuthenticated = () => false; // User is not authenticated.

  render(
    <MemoryRouter initialEntries={['/public']}>
      <Switch>
        {/* Sets up the private route that redirects to /public */}
        <PrivateRoute
          path="/private"
          redirectTo="/public"
          isAuthenticated={isAuthenticated}
        >
          <div>Private Route</div>
        </PrivateRoute>
        {/* Public route with a link to the private route */}
        <Route path="/public">
          <div>Public Route</div>
          <Link to="/private">go to private route</Link>
        </Route>
      </Switch>

      {/* Helper route to track location */}
      <Route
        path="*"
        render={(props) => {
          location = props.location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('go to private route'));

  // @ts-ignore
  expect(location.pathname).toBe('/public');
});

test('Does nothing when an authenticated User accesses a Private Route', () => {
  let location: RouteComponentProps['location'];

  const isAuthenticated = () => true; // User is authenticated.

  render(
    <MemoryRouter initialEntries={['/public']}>
      <Switch>
        {/* Sets up the private route that redirects to /public */}
        <PrivateRoute
          path="/private"
          redirectTo="/public"
          isAuthenticated={isAuthenticated}
        >
          <div>Private Route</div>
        </PrivateRoute>

        {/* Public route with a link to the private route */}
        <Route path="/public">
          <div>Public Route</div>
          <Link to="/private">go to private route</Link>
        </Route>
      </Switch>

      {/* Helper route to track location */}
      <Route
        path="*"
        render={(props) => {
          location = props.location;
          return null;
        }}
      />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('go to private route'));

  // @ts-ignore
  expect(location.pathname).toBe('/private');
});
