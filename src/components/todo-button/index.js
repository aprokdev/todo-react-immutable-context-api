import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

function TodoButton({ onClick, testId, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={false}
            className="todo-button"
            data-testid={testId}
        >
            {children}
        </button>
    );
}

TodoButton.propTypes = {
    onClick: PropTypes.func,
    testId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node,
};

export default TodoButton;
