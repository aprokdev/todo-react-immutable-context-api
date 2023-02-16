import React from 'react';
import Checkbox from '~ui/checkbox';
import Label from '~ui/label';

function HideChecked({ isCompletedHidden, setHideCompleted }) {
    return (
        <div className="hide-checked">
            <Checkbox
                checked={isCompletedHidden}
                onChange={(e) => setHideCompleted(e.target.checked)}
                id="#sort-checked"
                testId="sort-checked"
            />
            <Label htmlFor="#sort-checked">Hide completed</Label>
        </div>
    );
}

export default React.memo(HideChecked);
