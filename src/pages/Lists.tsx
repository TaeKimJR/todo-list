import React from 'react';

import { getAuthToken } from '../utils/auth';
import { GlobalActionsContext } from '../GlobalState';

import LogoutButton from '../features/LogoutButton';
import CreateListButton from '../features/CreateListButton';
import ListsTable from '../features/ListsTable';

/**
 * Fetches and initializes the lists from the API. This will only occur when the
 * calling component is mounted.
 */
const useInitializeLists = () => {
  const { initializeLists } = React.useContext(GlobalActionsContext);

  // Fetch the User's lists on mount.
  React.useEffect(() => {
    const fetchLists = async () => {
      const authToken = getAuthToken();

      const req = await fetch(
        `${process.env.REACT_APP_APP_URL}/list?token=${authToken}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!req.ok) {
        alert('Uh oh, something went wrong. Please try refreshing the page.');
        return;
      }

      const response = await req.json();

      initializeLists(response);
    };

    fetchLists();
    // We disable this line to ensure that we only call this on mount.
    // eslint-disable-next-line
  }, []);
};

/**
 * Lists Page to display the User's lists and allow them to...
 * - Create new lists
 */
const Lists = () => {
  useInitializeLists();

  return (
    <section>
      <h1>Lists</h1>
      <div>
        <LogoutButton />
        <CreateListButton />

        <ListsTable />
      </div>
    </section>
  );
};

export default Lists;
