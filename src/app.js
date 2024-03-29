import { List } from 'immutable';
import * as React from 'react';
import ClearLocalStorage from '@components/clear-local-storage';
import CreateTodo from '@components/create-todo';
import HideChecked from '@components/hide-checked';
import Sorting from '@components/sorting';
import TodosList from '@components/todos-list';
import { useTodos } from '@todo-context/index';
import jsIcon from '@img/icon.svg';
import immutable from '@img/immutable-new.png';
import './app.scss';

function App() {
    const { state, dispatch, isCompletedHidden, setHideCompleted } = useTodos();
    const listTodos = state.get('listTodos');
    const sortingTitle = state.get('sortingTitle');
    const isSavedTodos = state.get('isSavedTodos');

    const isCheckedTodos = React.useMemo(() => {
        return Boolean(
            List.isList(listTodos) &&
                listTodos.size > 0 &&
                listTodos.find((data) => data.get('isCompleted'))
        );
    }, [listTodos]);

    return (
        <div className="app">
            <div className="app__head">
                <h1 className="app__title">Todo List</h1>
                <a href="/" className="app__link">
                    <img src={jsIcon} alt="JS" title="JavaScript" className="app__head-img" />
                </a>
                <a
                    href="https://immutable-js.com/"
                    className="app__link"
                    target="__blank"
                    rel="noreferer noopener"
                >
                    <img
                        src={immutable}
                        alt="immutable.js"
                        title="Immutable.js"
                        className="app__head-img"
                    />
                </a>
            </div>
            <CreateTodo dispatch={dispatch} />
            {listTodos.size > 0 && <Sorting sortingTitle={sortingTitle} dispatch={dispatch} />}
            <TodosList
                listTodos={listTodos}
                dispatch={dispatch}
                isCompletedHidden={isCompletedHidden}
                setHideCompleted={setHideCompleted}
            />
            <div className="app__bottom">
                {List.isList(listTodos) && listTodos.size > 0 && (
                    <HideChecked
                        disabled={!isCheckedTodos}
                        isCompletedHidden={isCompletedHidden}
                        setHideCompleted={setHideCompleted}
                    />
                )}
                <ClearLocalStorage dispatch={dispatch} isSavedTodos={isSavedTodos} />
            </div>
        </div>
    );
}

export default App;
