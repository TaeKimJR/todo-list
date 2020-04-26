import React from 'react';
import { useParams } from 'react-router-dom';

import { getAuthToken } from '../utils/auth';
import { GlobalActionsContext, useGetListbyId } from '../GlobalState';

import LogoutButton from '../features/LogoutButton';
import CreateTaskButton from '../features/CreateTaskButton';
import TasksList from '../features/TasksList';

/**
 * Fetches and initializes the list from the API. This will only occur when the
 * calling component is mounted or when the list ID changes.
 */
const useInitializeList = (listId: string) => {
  const { initializeList } = React.useContext(GlobalActionsContext);

  React.useEffect(() => {
    const fetchList = async () => {
      const authToken = getAuthToken();

      const req = await fetch(
        `${process.env.REACT_APP_APP_URL}/list/${listId}?token=${authToken}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!req.ok) {
        // [Error] List does not exist
        if (req.status === 404) {
          alert(
            'It looks like that list does not exist. Try accessing another list.'
          );
        }
        // [Error] Generic Error
        else {
          alert('Uh oh, something went wrong. Please try refreshing the page.');
        }

        return;
      }

      const response = await req.json();

      initializeList(response);
    };

    fetchList();
    // We disable this line to ensure that we only call this on mount or if the
    // listId changes.
    // eslint-disable-next-line
  }, [listId]);
};

/**
 * List Page to display the User's specific list and allow them to...
 * - Mark TODO's as need to do or done
 * - Create new TODO's in the list
 */
const List = () => {
  const { listId } = useParams();
  const list = useGetListbyId(listId);

  useInitializeList(listId);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h1>List: {list.name}</h1>

      <div>
        <LogoutButton />

        <CreateTaskButton listId={list.id} />

        <TasksList listId={list.id} />
      </div>
    </section>
  );
};

export default List;
