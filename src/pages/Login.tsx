import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { authenticate } from '../utils/auth';

/**
 * Login Page to authenticate a User.
 */
const Login = () => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <section>
      <h1>Login</h1>

      {/* TODO: We can pull-out LoginForm into a feature */}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsSubmitting(true);

          const token = await authenticate(email, password);

          if (token) {
            // Check if the User was redirected to login when accessing another route. If so,
            // navigate the User to that route for convenience.
            // @ts-ignore
            const nextPath = location?.state?.from?.pathname || '/lists';
            history.push(nextPath);
          } else {
            // Reset the form on error.
            setIsSubmitting(false);
            setPassword('');
          }
        }}
      >
        <div>
          <label>
            Email
            <input
              required
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Password
            <input
              required
              name="password"
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </section>
  );
};

export default Login;
