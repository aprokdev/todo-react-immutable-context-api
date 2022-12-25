/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Fade from 'react-reveal/Fade';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TodoItem from '~components/todo-item';
import { sortState, useTodos } from '~todo-context/index';
import './style.scss';

function TodosList() {
    const {
        list,
        onChangeTodo,
        onDeleteTodo,
        onEditTodo,
        isCompletedHidden,
        setHideCompleted,
        sorting,
        updateSorting,
    } = useTodos();

    const onHeaderlickHeader = React.useCallback(() => {
        if (sorting === sortState.BY_DATE) {
            updateSorting(sortState.ALPHABET);
            return;
        }
        if (sorting === sortState.ALPHABET) {
            updateSorting(sortState.ALPHABET_REVERSE);
            return;
        }
        if (sorting === sortState.ALPHABET_REVERSE) {
            updateSorting(sortState.BY_DATE);
            return;
        }
    }, [sorting, updateSorting]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <React.Fragment>
            {list.length > 0 && (
                <h4
                    className="todo-list__header"
                    onClick={onHeaderlickHeader}
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
                    list.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.id}
                                onChangeTodo={onChangeTodo}
                                onDeleteTodo={onDeleteTodo}
                                onEditTodo={onEditTodo}
                                testId={todo.id}
                                data={todo}
                            />
                        );
                    })}
                {isCompletedHidden &&
                    list
                        .filter(({ isCompleted }) => !isCompleted)
                        .map((todo) => {
                            return (
                                <TodoItem
                                    key={todo.id}
                                    onChangeTodo={onChangeTodo}
                                    onDeleteTodo={onDeleteTodo}
                                    onEditTodo={onEditTodo}
                                    testId={todo.id}
                                    data={todo}
                                />
                            );
                        })}
            </div>
            {list.length > 0 && list.find(({ isCompleted }) => isCompleted) && (
                <Fade bottom>
                    <div className="todo-list__check-group">
                        <Checkbox
                            checked={isCompletedHidden}
                            onChange={(e) => setHideCompleted(e.target.checked)}
                            id="#sort-checked"
                            testId="sort-checked"
                        />
                        <Label htmlFor="#sort-checked">Hide completed</Label>
                    </div>
                </Fade>
            )}
        </React.Fragment>
    );
}

export default TodosList;
