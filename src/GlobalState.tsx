import React from 'react';

type Action = { type: string; data: any };

type List = {
  id: string;
  name: string;
  tasks: [];
};

type State = {
  lists: List[];
};

/**
 * Provides the Global State to all descendants.
 */
export const GlobalStateContext = React.createContext({
  lists: [],
});

/**
 * Provides the actions that can affect Global State to all descendants.
 */
export const GlobalActionsContext = React.createContext({
  initializeLists: (lists: List[]) => {},
  createList: (list: List) => {},
});

const initialState = {
  lists: [],
};
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'INITIALIZE_LISTS':
      return { ...state, lists: action.data };

    case 'CREATE_LIST':
      return { ...state, lists: [...state.lists, action.data] };

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
      console.log('hit');
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

  // All actions that can affect the global state.
  const globalActions = React.useMemo(
    () => ({
      initializeLists,
      createList,
    }),
    [createList, initializeLists]
  );

  return (
    <GlobalStateContext.Provider value={globalState}>
      <GlobalActionsContext.Provider value={globalActions}>
        {children}
      </GlobalActionsContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;
