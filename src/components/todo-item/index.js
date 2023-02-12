/* eslint-disable jsx-a11y/no-autofocus */
import PropTypes from 'prop-types';
import React from 'react';
import Fade from 'react-reveal/Fade';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';
import TextareaAutosize from '~ui/textarea-autosize';
import { actionTypes } from '../../todo-context';
import TodoButton from '../todo-button';
import './style.scss';

function TodoItem({ data, dispatch, testId }) {
    const { id, label, isCompleted, created } = data.toObject();
    const [editing, setEditing] = React.useState(false);
    const [value, setValue] = React.useState(label);

    const onBlurInput = React.useCallback(() => {
        dispatch({ type: actionTypes.EDIT_TODO, text: value, id });
        setEditing(false);
    }, [id, value, setEditing, dispatch]);

    const date = React.useMemo(() => {
        const date = new Date(created);
        return date.toLocaleDateString('en-EN', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }, [created]);

    return (
        <Fade bottom>
            <div className="todo-item" data-testid={`todo-item${testId ? `-${testId}` : ''}`}>
                <div className="todo-item__check-group">
                    <Checkbox
                        checked={isCompleted}
                        onChange={({ target }) =>
                            dispatch({ type: actionTypes.CHECK_TODO, id, checked: target.checked })
                        }
                        id={id}
                        testId={`${label}-cb`}
                    />
                    {editing ? (
                        <TextareaAutosize
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={onBlurInput}
                            id={id}
                            className="todo-item__input"
                            autoFocus
                            data-testid={`${label}-edit-field`}
                        />
                    ) : (
                        <Label htmlFor={id} testId={`${label}-label`}>
                            {label}
                        </Label>
                    )}
                </div>
                <span className="todo-item__created">{date}</span>
                <TodoButton onClick={() => setEditing(true)} testid={`${label}-edit`}>
                    Edit
                </TodoButton>
                <span className="todo-item__separator">/</span>
                <TodoButton
                    onClick={() => dispatch({ type: actionTypes.DELETE_TODO, id })}
                    testid={`${label}-delete`}
                >
                    Delete
                </TodoButton>
            </div>
        </Fade>
    );
}

TodoItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isCompleted: PropTypes.bool,
        label: PropTypes.string,
        created: PropTypes.number,
    }),
    dispatch: PropTypes.func,
    testId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(TodoItem);
