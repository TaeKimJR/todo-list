import React from 'react';

import LogoutButton from '../features/LogoutButton';

/**
 * List Page to display the User's specific list and allow them to...
 * - Mark TODO's as need to do or done
 * - Create new TODO's in the list
 */
const List = () => {
  return (
    <section>
      <h1>List</h1>

      <div>
        <LogoutButton />
      </div>
    </section>
  );
};

export default List;
