import React from 'react';

import LoginForm from '../features/LoginForm';

/**
 * Login Page to authenticate a User.
 */
const Login = () => {
  return (
    <section>
      <h1>Login</h1>

      <div>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
