import PropTypes from 'prop-types';
import * as React from 'react';
import './style.scss';

function Label(props) {
    const { children, className, htmlFor, testId = 'label', disabled } = props;

    return (
        <label
            className={`label${className ? ` ${className}` : ''}${disabled ? ' disabled' : ''}`}
            htmlFor={htmlFor}
            data-testid={testId}
        >
            {children}
        </label>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string,
    disabled: PropTypes.bool,
};

export default React.memo(Label);
