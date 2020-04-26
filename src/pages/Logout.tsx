import React from 'react';
import { useHistory } from 'react-router-dom';

import { unauthenticate } from '../utils/auth';

/**
 * A Page that will log the User out and redirect them back to Login.
 */
const Logout = () => {
  const history = useHistory();

  React.useEffect(() => {
    const success = unauthenticate();
    if (success) {
      history.push('/login');
    }
  }, [history]);

  return null;
};

export default Logout;
