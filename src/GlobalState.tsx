import React from 'react';

type Action = { type: string; data: any };

type Task = {
  id: number;
  title: string;
  complete: boolean;
};

type List = {
  id: number;
  name: string;
  tasks: Task[];
};

type State = {
  lists: List[];
};

/**
 * Provides the Global State to all descendants.
 */
export const GlobalStateContext = React.createContext({
  lists: [] as List[],
});

/**
 * Provides the actions that can affect Global State to all descendants.
 */
export const GlobalActionsContext = React.createContext({
  initializeLists: (lists: List[]) => {},
  createList: (list: List) => {},
  initializeList: (list: List) => {},
  createTask: (listId: number, task: Task) => {},
});

// TODO: Test reducer.
const initialState = {
  lists: [],
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITIALIZE_LISTS': {
      return { ...state, lists: action.data };
    }

    case 'CREATE_LIST': {
      return { ...state, lists: [...state.lists, action.data] };
    }

    case 'INITIALIZE_LIST': {
      const newList = action.data;
      const listIndex = state.lists.findIndex(({ id }) => (id = newList.id));
      let nextLists = [...state.lists];
      if (listIndex > -1) {
        nextLists[listIndex] = newList;
      } else {
        nextLists = [...nextLists, newList];
      }

      return { ...state, lists: nextLists };
    }

    case 'CREATE_TASK': {
      const { listId, task } = action.data;

      const listIndex = state.lists.findIndex(({ id }) => (id = listId));
      let nextLists = [...state.lists];

      if (listIndex > -1) {
        const nextList = { ...nextLists[listIndex] };
        const nextTasks = [...nextList.tasks];

        nextList.tasks = nextTasks ? [...nextTasks, task] : [task];
        nextLists[listIndex] = nextList;
      }

      return { ...state, lists: nextLists };
    }

    default:
      throw new Error();
  }
};

type Props = {
  children: React.ReactNode;
};

const GlobalState = ({ children }: Props) => {
  const [globalState, dispatch] = React.useReducer(reducer, initialState);

  // Sets the lists in the global state. This will overwrite any lists previously set.
  const initializeLists = React.useCallback(
    (lists: List[]) => {
      dispatch({ type: 'INITIALIZE_LISTS', data: lists });
    },
    [dispatch]
  );

  // Appends the provided list to the global state's lists.
  const createList = React.useCallback(
    (list: List) => {
      dispatch({ type: 'CREATE_LIST', data: list });
    },
    [dispatch]
  );

  // Sets the list in the global state. This will overwrite the list if it already exists.
  const initializeList = React.useCallback(
    (list: List) => {
      dispatch({ type: 'INITIALIZE_LIST', data: list });
    },
    [dispatch]
  );

  const createTask = React.useCallback((listId: number, task: Task) => {
    dispatch({ type: 'CREATE_TASK', data: { listId, task } });
  }, []);

  // All actions that can affect the global state.
  const globalActions = React.useMemo(
    () => ({
      initializeLists,
      createList,
      initializeList,
      createTask,
    }),
    [createList, createTask, initializeList, initializeLists]
  );

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalActionsContext.Provider value={globalActions}>
        {children}
      </GlobalActionsContext.Provider>
    </GlobalStateContext.Provider>
  );
};

// Helper hook to retrieve a list by it's ID.
export const useGetListbyId = (listId: string | number) => {
  // The ID of the list must be a number to compare.
  const listIdNumber = typeof listId === 'string' ? parseInt(listId) : listId;

  const { lists } = React.useContext(GlobalStateContext);
  const listIndex = lists.findIndex(({ id }) => id === listIdNumber);

  return lists[listIndex];
};

export default GlobalState;
