import React from 'react';

import { getAuthToken } from '../utils/auth';

import { GlobalActionsContext, useGetListbyId } from '../GlobalState';

type Props = {
  listId: number;
};

/**
 * Displays a list of Tasks for a particular List.
 */
const TasksList = ({ listId }: Props) => {
  const list = useGetListbyId(listId);
  const { completeTask, incompleteTask } = React.useContext(
    GlobalActionsContext
  );

  const toggleTask = async (taskId: number, complete: boolean) => {
    // Set the UI immediately to provide instant feedback to the User. The server might be slow
    // to send a response, which will make the checkbox laggy.
    if (complete) {
      completeTask(listId, taskId);
    } else {
      incompleteTask(listId, taskId);
    }

    const authToken = getAuthToken();

    const req = await fetch(
      `${process.env.REACT_APP_APP_URL}/list/${listId}/task/${taskId}/complete?token=${authToken}`,
      {
        // Based on if we are completing or incompleting a task, use PUT vs DELETE.
        method: complete ? 'PUT' : 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!req.ok) {
      alert('Uh oh, something went wrong. Please try refreshing the page.');

      // Because we immediately set the checkbox before... if there is an error revert our
      // update.
      if (!complete) {
        completeTask(listId, taskId);
      } else {
        incompleteTask(listId, taskId);
      }

      return;
    }

    await req.json();
  };

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {list.tasks.length === 0 && (
        <div>There are no tasks. Please create one.</div>
      )}

      {list.tasks.map(({ id, title, complete }) => (
        <div key={id}>
          <label>
            <input
              type="checkbox"
              checked={complete}
              onChange={() => toggleTask(id, !complete)}
            />
            {title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
