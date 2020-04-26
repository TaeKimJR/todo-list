import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { authenticate } from '../utils/auth';

/**
 * The form to log the User in.
 */
const LoginForm = () => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
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
  );
};

export default LoginForm;
