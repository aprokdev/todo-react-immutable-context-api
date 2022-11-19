import PropTypes from 'prop-types';
import * as React from 'react';
import './style.scss';

function Label({ htmlFor, children, className, testId = 'label' }) {
    return (
        <label className={`label${className ? ` ${className}` : ''}`} htmlFor={htmlFor} data-testid={testId}>
            {children}
        </label>
    );
}

Label.propTypes = {
    htmlFor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    testId: PropTypes.string,
};

export default Label;
