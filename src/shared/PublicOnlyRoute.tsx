import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

type PublicOnlyRouteProps = {
  children: React.ReactNode;
  redirectTo: string;
  isAuthenticated: () => boolean;
} & RouteProps;

/**
 * A wrapper for <Route> that redirects the User if they are already authenticated.
 * See https://reacttraining.com/react-router/web/example/auth-workflow for more info.
 */
const PublicOnlyRoute = ({
  children,
  redirectTo,
  isAuthenticated,
  ...rest
}: PublicOnlyRouteProps) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated() ? (
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

export default PublicOnlyRoute;
