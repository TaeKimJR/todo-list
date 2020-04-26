import React from 'react';
import { Link } from 'react-router-dom';

import { GlobalStateContext } from '../GlobalState';

import styles from './ListsTable.module.scss';

/**
 * Displays a table of lists.
 */
const Lists = () => {
  const { lists } = React.useContext(GlobalStateContext);

  return (
    <div>
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
          {lists.map(({ id, name }) => (
            <div key={id} className={styles.row}>
              <div className={styles.column}>
                <Link to={`/lists/${id}`}>{name}</Link>
              </div>
              {/* TODO: Get the task completion */}
              <div className={styles.column}>1 complete, 1 incomplete</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Lists;
