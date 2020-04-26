import React from 'react';
import { Link } from 'react-router-dom';

import { GlobalStateContext } from '../GlobalState';

import styles from './ListsTable.module.scss';

/**
 * Displays a table of lists.
 */
const Lists = () => {
  const { lists } = React.useContext(GlobalStateContext);

  // Returns the number of completed and incompleted Tasks in a List.
  const getCompletedAndIncompleted = (listId: number) => {
    const listIndex = lists.findIndex(({ id }) => id === listId);
    const list = lists[listIndex];
    const completedTasks = list.tasks.filter(({ complete }) => complete);

    const completed = completedTasks.length;
    const incompleted = list.tasks.length - completed;

    return [completed, incompleted];
  };

  // Returns the description to display for a given list.
  const getCompletedDescription = (listId: number) => {
    const [completed, incompleted] = getCompletedAndIncompleted(listId);
    if (completed === 0 && incompleted === 0) {
      return 'There are no Tasks in this list.';
    }

    if (incompleted === 0) {
      return `${completed} complete.`;
    }

    if (completed === 0) {
      return `${incompleted} incomplete.`;
    }

    return `${completed} complete, ${incompleted} incomplete.`;
  };

  return (
    <div className={styles.container}>
      {lists.length === 0 && <div>There are no lists. Please create one.</div>}

      {lists.length > 0 && (
        <>
          <div className={styles.row}>
            <div className={styles.column}>
              <b>Name</b>
            </div>
            <div className={styles.column}>
              <b>Progress</b>
            </div>
          </div>
          {lists.map(({ id, name }) => {
            return (
              <div key={id} className={styles.row}>
                <div className={styles.column}>
                  <Link to={`/lists/${id}`}>{name}</Link>
                </div>
                <div className={styles.column}>
                  {getCompletedDescription(id)}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Lists;
