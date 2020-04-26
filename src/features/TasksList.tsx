import React from 'react';

import { useGetListbyId } from '../GlobalState';

type Props = {
  listId: number;
};

/**
 * Displays a list of Tasks for a particular List.
 */
const TasksList = ({ listId }: Props) => {
  const list = useGetListbyId(listId);

  const toggleTask = (taskId: number) => {
    // TODO: Handle toggling a task.
    console.log(taskId);
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
              onChange={() => toggleTask(id)}
            />
            {title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TasksList;
