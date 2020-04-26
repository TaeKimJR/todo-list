import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import {
  MemoryRouter,
  Switch,
  Route,
  Link,
  RouteComponentProps,
} from 'react-router-dom';

import PublicOnlyRoute from './PublicOnlyRoute';

test('redirects when an authenticated User accesses a Public Only Route', () => {
  let location: RouteComponentProps['location'];

  const isAuthenticated = () => true; // User is authenticated.

  render(
    <MemoryRouter initialEntries={['/private']}>
      <Switch>
        {/* Sets up the public only route that redirects to /private */}
        <PublicOnlyRoute
          path="/public"
          redirectTo="/private"
          isAuthenticated={isAuthenticated}
        >
          <div>Public Only Route</div>
        </PublicOnlyRoute>

        {/* Private route with a link to the public only route */}
        <Route path="/private">
          <div>Private Route</div>
          <Link to="/public">go to public only route</Link>
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

  fireEvent.click(screen.getByText('go to public only route'));

  // @ts-ignore
  expect(location.pathname).toBe('/private');
});

test('Does nothing when an unauthenticated User accesses a Public Only Route', () => {
  let location: RouteComponentProps['location'];

  const isAuthenticated = () => false; // User is not authenticated.

  render(
    <MemoryRouter initialEntries={['/private']}>
      <Switch>
        {/* Sets up the public only route that redirects to /private */}
        <PublicOnlyRoute
          path="/public"
          redirectTo="/private"
          isAuthenticated={isAuthenticated}
        >
          <div>Public Only Route</div>
        </PublicOnlyRoute>

        {/* Private route with a link to the public only route */}
        <Route path="/private">
          <div>Private Route</div>
          <Link to="/public">go to public only route</Link>
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

  fireEvent.click(screen.getByText('go to public only route'));

  // @ts-ignore
  expect(location.pathname).toBe('/public');
});
