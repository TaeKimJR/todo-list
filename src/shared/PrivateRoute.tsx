import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
  isAuthenticated: () => boolean;
} & RouteProps;

/**
 * A wrapper for <Route> that redirects to the login screen if you're not yet authenticated.
 * See https://reacttraining.com/react-router/web/example/auth-workflow for more info.
 */
const PrivateRoute = ({
  children,
  redirectTo,
  isAuthenticated,
  ...rest
}: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
