import React from 'react';

// import { Map, List } from "immutable";

export const TodoContext = React.createContext({
    list: [],
    addTodo: () => undefined,
    onChangeTodo: () => undefined,
    onDeleteTodo: () => undefined,
    onEditTodo: () => undefined,
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

export function TodoProvider({ children }) {
    const localState = JSON.parse(localStorage.getItem('todo-list')) || [];
    const [list, updateList] = React.useState(localState);

    // Immutable.js
    // const [list, updateList] = React.useState(List(localState.map((item) => Map(item))));

    const [isCompletedHidden, setHideCompleted] = React.useState(false);

    const localSorting = JSON.parse(localStorage.getItem('sorting')) || `${sortState.BY_DATE}`;
    const [sorting, updateSorting] = React.useState(localSorting);
    const sortingRef = React.useRef(sortState.BY_DATE);

    React.useEffect(() => {
        if (sorting === sortState.BY_DATE && sortingRef.current !== sortState.BY_DATE) {
            updateList(
                [...list].sort((a, b) => {
                    if (a.created < b.created) {
                        return -1;
                    }
                    return 1;
                })
            );
            sortingRef.current = sortState.BY_DATE;

            // Immutable.js
            // updateList(
            //     [...list.toArray()].map(item => item.toObject()).sort((a, b) => {
            //         if (a.created < b.created) {
            //             return -1;
            //         }
            //         return 1;
            //     }).map(item => Map(item))
            // );
            // sortingRef.current = sortState.BY_DATE;
        }

        if (sorting === sortState.ALPHABET && sortingRef.current !== sortState.ALPHABET) {
            updateList(
                [...list].sort((a, b) => {
                    if (a.label < b.label) {
                        return -1;
                    }
                    return 1;
                })
            );
            sortingRef.current = sortState.ALPHABET;

            // Immutable.js
            // updateList(
            //     [...list.toArray()].map(item => item.toObject()).sort((a, b) => {
            //         if (a.label < b.label) {
            //             return -1;
            //         }
            //         return 1;
            //     }).map(item => Map(item))
            // );
            // sortingRef.current = sortState.ALPHABET;
        }

        if (sorting === sortState.ALPHABET_REVERSE && sortingRef.current !== sortState.ALPHABET_REVERSE) {
            updateList(
                [...list]
                    .sort((a, b) => {
                        if (a.label < b.label) {
                            return -1;
                        }
                        return 1;
                    })
                    .reverse()
            );
            sortingRef.current = sortState.ALPHABET_REVERSE;

            // Immutable.js
            // updateList(
            //     [...list.toArray()]
            //         .map(item => item.toObject())
            //         .sort((a, b) => {
            //             if (a.label < b.label) {
            //                 return -1;
            //             }
            //             return 1;
            //         })
            //         .reverse()
            //         .map(item => Map(item))
            // );
            sortingRef.current = sortState.ALPHABET_REVERSE;
        }
    }, [sorting, list]);

    const addTodo = React.useCallback(
        (text) => {
            const updatedList = [...list];
            updatedList.push({
                id: +new Date(),
                label: text.trim(),
                isCompleted: false,
                created: +new Date(),
            });
            updateList(updatedList);

            // Immutable.js
            // const updatedList = list.push(Map({
            //     id: +new Date(),
            //     label: text.trim(),
            //     isCompleted: false,
            //     created: +new Date(),
            // }));
            // updateList(updatedList);
        },
        [list, updateList]
    );

    const onChangeTodo = React.useCallback(
        (e) => {
            const updatedList = list.map((item) => {
                if (String(e.target.id) === String(item.id)) {
                    return { ...item, isCompleted: e.target.checked };
                }
                return item;
            });
            updateList(updatedList);

            // Immutable.js
            // const index = list.findIndex((data) => String(e.target.id) === String(data.get('id')));
            // const updatedList = list.update(index, (data) => data.set('isCompleted', e.target.checked));
            // updateList(updatedList);
        },
        [list, updateList]
    );

    const onDeleteTodo = React.useCallback(
        (id) => {
            const arr = [...list];
            const index = arr.findIndex((item) => String(id) === String(item.id));
            arr.splice(index, 1);
            updateList(arr);

            // Immutable.js
            // const index = list.findIndex((data) => String(id) === String(data.get('id')));
            // const updatedList = list.delete(index);
            // updateList(updatedList);
        },
        [list, updateList]
    );

    const onEditTodo = React.useCallback(
        (text, id) => {
            const updatedList = list.map((item) => {
                if (String(id) === String(item.id)) {
                    return { ...item, label: text };
                }
                return item;
            });
            updateList(updatedList);

            // Immutable.js
            // const index = list.findIndex((data) => String(id) === String(data.get('id')));
            // const updatedList = list.update(index, (data) => data.set('label', text));
            // updateList(updatedList);
        },
        [list, updateList]
    );

    React.useEffect(() => {
        const val = list.length ? list : null;

        // Immutable.js
        // let val = null;
        // if (list.size) {
        //     val = list.toArray();
        // }
        localStorage.setItem('todo-list', JSON.stringify(val));
    }, [list]);

    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);

    const value = React.useMemo(
        () => ({
            list,
            addTodo,
            onChangeTodo,
            onDeleteTodo,
            onEditTodo,
            isCompletedHidden,
            setHideCompleted,
            sorting,
            updateSorting,
        }),
        [
            list,
            addTodo,
            onChangeTodo,
            onDeleteTodo,
            onEditTodo,
            isCompletedHidden,
            setHideCompleted,
            sorting,
            updateSorting,
        ]
    );

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
