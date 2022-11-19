/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import Button from '~ui/button';
import Input from '~ui/input';
import { useTodos } from '~todo-context/index';
import './style.scss';

function CreateTodo() {
    const [value, updateValue] = React.useState('');
    const { addTodo } = useTodos();

    const createTodo = React.useCallback(
        (event) => {
            event.preventDefault();
            if (value) addTodo(value);
            updateValue('');
        },
        [value, addTodo]
    );

    const onChange = React.useCallback(
        (event) => {
            updateValue(event.target.value);
        },
        [updateValue]
    );

    return (
        <form className="create-todo">
            <Input
                placeholder="Write new task here..."
                value={value}
                onChange={onChange}
                id="new-todo-input"
                testId="todo-input"
            />
            <Button type="submit" onClick={createTodo} disabled={!value} testId="todo-create-btn">
                Add
            </Button>
        </form>
    );
}

export default CreateTodo;
