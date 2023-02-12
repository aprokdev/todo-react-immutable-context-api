/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TodoItem from '~components/todo-item';
import { sortState } from '~todo-context/index';
import './style.scss';

function TodosList({
    listTodos,
    dispatch,
    isCompletedHidden,
    setHideCompleted,
    sorting,
    updateSorting,
}) {
    // const onHeaderlickHeader = React.useCallback(() => {
    //     if (sorting === sortState.BY_DATE) {
    //         updateSorting(sortState.ALPHABET);
    //         return;
    //     }
    //     if (sorting === sortState.ALPHABET) {
    //         updateSorting(sortState.ALPHABET_REVERSE);
    //         return;
    //     }
    //     if (sorting === sortState.ALPHABET_REVERSE) {
    //         updateSorting(sortState.BY_DATE);
    //         return;
    //     }
    // }, [sorting, updateSorting]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <React.Fragment>
            {listTodos.size > 0 && (
                <h4
                    className="todo-list__header"
                    // onClick={onHeaderlickHeader}
                    tabIndex="0"
                    ref={headerRef}
                    onKeyDown={onKeyDown}
                >
                    ✨ Sort tasks by:
                    {sorting === sortState.BY_DATE && ' CREATION DATE'}
                    {sorting === sortState.ALPHABET && ' ALPHABET'}
                    {sorting === sortState.ALPHABET_REVERSE && ' ALPHABET-REVERSE'}
                </h4>
            )}
            <div>
                {!isCompletedHidden &&
                    listTodos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.get('id')}
                                data={todo}
                                dispatch={dispatch}
                                testId={todo.get('id')}
                            />
                        );
                    })}
                {isCompletedHidden &&
                    listTodos
                        .filter(({ isCompleted }) => !isCompleted)
                        .map((todo) => {
                            return (
                                <TodoItem
                                    key={todo.get('id')}
                                    data={todo}
                                    dispatch={dispatch}
                                    testId={todo.get('id')}
                                />
                            );
                        })}
            </div>
            {listTodos.size > 0 && listTodos.find((data) => data.get('isCompleted')) && (
                <div className="todo-list__check-group">
                    <Checkbox
                        checked={isCompletedHidden}
                        onChange={(e) => setHideCompleted(e.target.checked)}
                        id="#sort-checked"
                        testId="sort-checked"
                    />
                    <Label htmlFor="#sort-checked">Hide completed</Label>
                </div>
            )}
        </React.Fragment>
    );
}

export default React.memo(TodosList);
