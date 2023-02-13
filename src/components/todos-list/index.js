/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { List } from 'immutable';
import React from 'react';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TodoItem from '~components/todo-item';
import './style.scss';

function TodosList({ listTodos, dispatch, isCompletedHidden, setHideCompleted }) {
    return (
        <React.Fragment>
            <div>
                {!isCompletedHidden &&
                    List.isList(listTodos) &&
                    listTodos.map((todo) => {
                        return (
                            <TodoItem
                                key={todo.get('id')}
                                todo={todo}
                                dispatch={dispatch}
                                testId={todo.get('id')}
                            />
                        );
                    })}
                {isCompletedHidden &&
                    listTodos
                        .filter((todo) => !todo.get('isCompleted'))
                        .map((todo) => {
                            return (
                                <TodoItem
                                    key={todo.get('id')}
                                    todo={todo}
                                    dispatch={dispatch}
                                    testId={todo.get('id')}
                                />
                            );
                        })}
            </div>
            {List.isList(listTodos) &&
                listTodos.size > 0 &&
                listTodos.find((data) => data.get('isCompleted')) && (
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
