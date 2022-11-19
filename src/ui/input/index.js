import PropTypes from 'prop-types';
import React from 'react';
import './style.scss';

const Input = React.forwardRef((props, ref) => {
    const { value, className, onChange, onBlur, id, type = 'text', placeholder, testId = 'input' } = props;
    return (
        <input
            type={type}
            value={value}
            placeholder={placeholder}
            className={`input${className ? ` ${className}` : ''}`}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            ref={ref}
            data-testid={testId}
        />
    );
});

Input.propTypes = {
    className: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    testId: PropTypes.string,
};

Input.displayName = 'Input';

export default Input;
