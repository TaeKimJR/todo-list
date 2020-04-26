import React from 'react';

import { getAuthToken } from '../utils/auth';
import { GlobalActionsContext } from '../GlobalState';

/**
 * A button to create a new List.
 */
const CreateListButton = () => {
  const { createList } = React.useContext(GlobalActionsContext);

  // Create a new list.
  const createNewList = async () => {
    const name = prompt('Enter the name of your new list.');

    if (!name) {
      alert('You did not enter a name for the list. Please try again.');
      return;
    }

    const authToken = getAuthToken();
    const req = await fetch(
      `${process.env.REACT_APP_APP_URL}/list?token=${authToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    if (!req.ok) {
      alert('Uh oh, something went wrong. Please try refreshing the page.');
      return;
    }

    const response = await req.json();

    createList(response);
  };

  return (
    <button type="button" onClick={createNewList}>
      + New List
    </button>
  );
};

export default CreateListButton;
