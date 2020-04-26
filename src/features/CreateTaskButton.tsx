import React from 'react';

import { getAuthToken } from '../utils/auth';
import { GlobalActionsContext } from '../GlobalState';
type Props = {
  listId: number;
};

/**
 * A button to create a new Task.
 */
const CreateTaskButton = ({ listId }: Props) => {
  const { createTask } = React.useContext(GlobalActionsContext);

  const createNewTask = async () => {
    const title = prompt('Enter the name of the new task.');

    if (!title) {
      alert('You did not enter a name for the task. Please try again.');
      return;
    }

    const authToken = getAuthToken();
    const req = await fetch(
      `${process.env.REACT_APP_APP_URL}/list/${listId}/task?token=${authToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    if (!req.ok) {
      alert('Uh oh, something went wrong. Please try refreshing the page.');
      return;
    }

    const response = await req.json();

    createTask(listId, response);
  };

  return (
    <button type="button" onClick={createNewTask}>
      + New Task
    </button>
  );
};

export default CreateTaskButton;
