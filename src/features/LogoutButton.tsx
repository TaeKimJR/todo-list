import React from 'react';
import { Link } from 'react-router-dom';

/**
 * A button to log the User out.
 */
const LogoutButton = () => {
  return <Link to="/logout">Logout</Link>;
};

export default LogoutButton;
