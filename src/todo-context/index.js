import { List, Map } from 'immutable';
import React from 'react';
import { todosReducer } from './reducer';
import { sortingText } from './reducer';

export const TodoContext = React.createContext();
TodoContext.displayName = 'TodoContext';

export function useTodos() {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error(`useTodos must be used within a TodoProvider`);
    }
    return context;
}

// const localState = JSON.parse(localStorage.getItem('todo-state'));
// const localTodos = localState ? localState.listTodos : [];
// const localSorting = localState ? localState.sortingTitle : sortingText.CREATION_DATE;

// const initialState = Map({
//     listTodos: List(localTodos.map((todo) => Map(todo))),
//     sortingTitle: localSorting,
// });

function TodoProvider({ children }) {
    // this ugly initialState should be as it is to make tests work properly
    const [state, dispatch] = React.useReducer(
        todosReducer,
        Map({
            listTodos: List(
                JSON.parse(localStorage.getItem('listTodos'))?.map((todo) => Map(todo))
            ),
            sortingTitle:
                JSON.parse(localStorage.getItem('sortingTitle')) || sortingText.CREATION_DATE,
        })
    );
    const [isCompletedHidden, setHideCompleted] = React.useState(false);

    // saving every edit in localStorage:
    React.useEffect(() => {
        localStorage.setItem('listTodos', JSON.stringify(state.get('listTodos')));
        localStorage.setItem('sortingTitle', JSON.stringify(state.get('sortingTitle')));
    }, [state]);

    const value = React.useMemo(
        () => ({
            state,
            dispatch,
            isCompletedHidden,
            setHideCompleted,
        }),
        [state, dispatch, isCompletedHidden, setHideCompleted]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export { TodoProvider };
export default TodoProvider;
