import { List, Map } from 'immutable';
import React from 'react';

export const TodoContext = React.createContext({
    listTodos: [],
    leaveOnlyChecked: false,
    setLeaveOnlyChecked: () => undefined,
    headerClickedTimes: 0,
    countClickHeader: () => undefined,
});

TodoContext.displayName = 'TodoContext';

export function useTodos() {
    const context = React.useContext(TodoContext);
    if (!context) {
        throw new Error(`useTodos must be used within a TodoProvider`);
    }
    return context;
}

export const sortState = {
    BY_DATE: 'BY_CREATION_DATE',
    ALPHABET: 'FROM_A_TO_Z',
    ALPHABET_REVERSE: 'FROM_Z_TO_A',
};

export const sortingText = {
    CREATION_DATE: 'CREATION DATE',
    ALPHABET: 'ALPHABET',
    ALPHABET_REVERSE: 'ALPHABET-REVERSE',
};

function findIndex(state, id) {
    return state.findIndex((data) => String(id) === String(data.get('id')));
}

export const actionTypes = {
    ADD_TODO: 'ADD_TODO',
    CHECK_TODO: 'CHECK_TODO',
    DELETE_TODO: 'DELETE_TODO',
    EDIT_TODO: 'EDIT_TODO',
    SORT_BY_DATE: 'SORT_BY_DATE',
    SORT_BY_ALPHABET: 'SORT_BY_ALPHABET',
    SORT_BY_ALPHABET_REVERSE: 'SORT_BY_ALPHABET_REVERSE',
};

const localTodos = JSON.parse(localStorage.getItem('todo-list')) || [];
const localSorting = JSON.parse(localStorage.getItem('sorting')) || `${sortingText.CREATION_DATE}`;

const initialState = Map({
    listTodos: List(localTodos),
    sortingTitle: localSorting,
});

function todosReducer(state, action) {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            return state.push(
                Map({
                    id: +new Date(),
                    label: action.text.trim(),
                    isCompleted: false,
                    created: +new Date(),
                })
            );

        case actionTypes.CHECK_TODO:
            return state.update(findIndex(state, action.id), (data) =>
                data.set('isCompleted', action.checked)
            );

        case actionTypes.DELETE_TODO:
            return state.delete(findIndex(state, action.id));

        case actionTypes.EDIT_TODO:
            return state.update(findIndex(state, action.id), (data) =>
                data.set('label', action.text)
            );

        case actionTypes.SORT_BY_DATE:
            return state.sort((a, b) => {
                if (a.get('created') < b.get('created')) {
                    return -1;
                }
                return 1;
            });

        case actionTypes.SORT_BY_ALPHABET:
            return state.sort((a, b) => {
                if (a.get('label') < b.get('label')) {
                    return -1;
                }
                return 1;
            });

        case actionTypes.SORT_BY_ALPHABET_REVERSE:
            return state
                .sort((a, b) => {
                    if (a.get('label') < b.get('label')) {
                        return -1;
                    }
                    return 1;
                })
                .reverse();

        default:
            return state;
    }
}

export function TodoProvider({ children }) {
    const [listTodos, dispatch] = React.useReducer(todosReducer, List(localTodos));

    const [isCompletedHidden, setHideCompleted] = React.useState(false);

    const localSorting = JSON.parse(localStorage.getItem('sorting')) || `${sortState.BY_DATE}`;
    const [sorting, updateSorting] = React.useState(localSorting);
    const sortingRef = React.useRef(sortState.BY_DATE);

    // React.useEffect(() => {
    //     if (sorting === sortState.BY_DATE && sortingRef.current !== sortState.BY_DATE) {
    //         // updateList(
    //         //     [...list].sort((a, b) => {
    //         //         if (a.created < b.created) {
    //         //             return -1;
    //         //         }
    //         //         return 1;
    //         //     })
    //         // );
    //         // sortingRef.current = sortState.BY_DATE;

    //         // Immutable.js
    //         updateTodos(
    //             listTodos
    //                 .map((item) => item.toObject())
    //                 .sort((a, b) => {
    //                     if (a.created < b.created) {
    //                         return -1;
    //                     }
    //                     return 1;
    //                 })
    //                 .map((item) => Map(item))
    //         );
    //         sortingRef.current = sortState.BY_DATE;
    //     }

    //     if (sorting === sortState.ALPHABET && sortingRef.current !== sortState.ALPHABET) {
    //         updateTodos(
    //             [...listTodos].sort((a, b) => {
    //                 if (a.label < b.label) {
    //                     return -1;
    //                 }
    //                 return 1;
    //             })
    //         );
    //         sortingRef.current = sortState.ALPHABET;

    //         // Immutable.js
    //         // updateList(
    //         //     [...list.toArray()].map(item => item.toObject()).sort((a, b) => {
    //         //         if (a.label < b.label) {
    //         //             return -1;
    //         //         }
    //         //         return 1;
    //         //     }).map(item => Map(item))
    //         // );
    //         // sortingRef.current = sortState.ALPHABET;
    //     }

    //     if (
    //         sorting === sortState.ALPHABET_REVERSE &&
    //         sortingRef.current !== sortState.ALPHABET_REVERSE
    //     ) {
    //         updateTodos(
    //             [...listTodos]
    //                 .sort((a, b) => {
    //                     if (a.label < b.label) {
    //                         return -1;
    //                     }
    //                     return 1;
    //                 })
    //                 .reverse()
    //         );
    //         sortingRef.current = sortState.ALPHABET_REVERSE;

    //         // Immutable.js
    //         // updateList(
    //         //     [...list.toArray()]
    //         //         .map(item => item.toObject())
    //         //         .sort((a, b) => {
    //         //             if (a.label < b.label) {
    //         //                 return -1;
    //         //             }
    //         //             return 1;
    //         //         })
    //         //         .reverse()
    //         //         .map(item => Map(item))
    //         // );
    //         sortingRef.current = sortState.ALPHABET_REVERSE;
    //     }
    // }, [sorting, listTodos]);

    React.useEffect(() => {
        const val = listTodos.size ? listTodos : null;

        // Immutable.js
        // let val = null;
        // if (list.size) {
        //     val = list.toArray();
        // }
        localStorage.setItem('todo-list', JSON.stringify(val));
    }, [listTodos]);

    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);

    const value = React.useMemo(
        () => ({
            listTodos,
            dispatch,
            isCompletedHidden,
            setHideCompleted,
            sorting,
            updateSorting,
        }),
        [listTodos, dispatch, isCompletedHidden, setHideCompleted, sorting, updateSorting]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
