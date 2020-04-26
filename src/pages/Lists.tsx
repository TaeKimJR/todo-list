import React from 'react';

import LogoutButton from '../features/LogoutButton';

/**
 * Lists Page to display the User's lists and allow them to...
 * - Create new lists
 */
const Lists = () => {
  return (
    <section>
      <h1>Lists</h1>
      <div>
        <LogoutButton />
      </div>
    </section>
  );
};

export default Lists;
