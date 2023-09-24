import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '@ui/checkbox';
import Label from '@ui/label';
import './style.scss';

function HideChecked({ isCompletedHidden, setHideCompleted, disabled }) {
    return (
        <div className="hide-checked">
            <Checkbox
                checked={isCompletedHidden}
                onChange={(e) => setHideCompleted(e.target.checked)}
                id="#sort-checked"
                testId="sort-checked"
                disabled={disabled}
            />
            <Label htmlFor="#sort-checked" disabled={disabled}>
                Hide completed
            </Label>
        </div>
    );
}

HideChecked.propTypes = {
    isCompletedHidden: PropTypes.bool.isRequired,
    setHideCompleted: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default React.memo(HideChecked);
