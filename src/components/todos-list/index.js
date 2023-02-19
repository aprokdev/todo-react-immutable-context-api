/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import TodoItem from '~components/todo-item';

function TodosList({ listTodos, dispatch, isCompletedHidden }) {
    return (
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
    );
}

TodosList.propTypes = {
    listTodos: PropTypes.instanceOf(List),
    dispatch: PropTypes.func.isRequired,
    isCompletedHidden: PropTypes.bool.isRequired,
};

export default React.memo(TodosList);
