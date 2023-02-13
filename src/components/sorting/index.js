/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { actionTypes } from '~todo-context/actionTypes';
import { sortingText } from '~todo-context/reducer';
import './style.scss';

function Sorting({ sortingTitle, dispatch }) {
    const onHeaderlickHeader = React.useCallback(() => {
        if (sortingTitle === sortingText.CREATION_DATE) {
            dispatch({ type: actionTypes.SORT_BY_ALPHABET });
        }
        if (sortingTitle === sortingText.ALPHABET) {
            dispatch({ type: actionTypes.SORT_BY_ALPHABET_REVERSE });
        }
        if (sortingTitle === sortingText.ALPHABET_REVERSE) {
            dispatch({ type: actionTypes.SORT_BY_DATE });
        }
    }, [dispatch, sortingTitle]);

    const headerRef = React.useRef(null);

    const onKeyDown = React.useCallback((event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            headerRef.current.click();
        }
    }, []);

    return (
        <h3
            className="sorting"
            onClick={onHeaderlickHeader}
            tabIndex="0"
            ref={headerRef}
            onKeyDown={onKeyDown}
        >
            ✨ Sort tasks by: {sortingTitle}
        </h3>
    );
}

export default React.memo(Sorting);
