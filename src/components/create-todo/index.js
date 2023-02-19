/* eslint-disable no-extra-boolean-cast */
import PropTypes from 'prop-types';
import React from 'react';
import Button from '~ui/button';
import Input from '~ui/input';
import { actionTypes } from '~todo-context/actionTypes';
import './style.scss';

function CreateTodo({ dispatch }) {
    const [text, updateText] = React.useState('');

    const createTodo = React.useCallback(
        (event) => {
            event.preventDefault();
            if (text) dispatch({ type: actionTypes.ADD_TODO, text });
            updateText('');
        },
        [text, dispatch]
    );

    const onChange = React.useCallback(
        (event) => {
            updateText(event.target.value);
        },
        [updateText]
    );

    return (
        <form className="create-todo">
            <Input
                placeholder="Write new task here..."
                value={text}
                onChange={onChange}
                id="new-todo-input"
                testId="todo-input"
            />
            <Button type="submit" onClick={createTodo} disabled={!text} testId="todo-create-btn">
                Add
            </Button>
        </form>
    );
}

CreateTodo.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default React.memo(CreateTodo);
