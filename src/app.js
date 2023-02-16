import { List } from 'immutable';
import * as React from 'react';
import CreateTodo from '~components/create-todo';
import HideChecked from '~components/hide-checked';
import Sorting from '~components/sorting';
import TodosList from '~components/todos-list';
import { useTodos } from '~todo-context/index';
import './app.scss';

function App() {
    const { state, dispatch, isCompletedHidden, setHideCompleted } = useTodos();
    const listTodos = state.get('listTodos');
    const sortingTitle = state.get('sortingTitle');
    return (
        <div className="app">
            <h1 className="app__title">Todo List</h1>
            <CreateTodo dispatch={dispatch} />
            {listTodos.size > 0 && <Sorting sortingTitle={sortingTitle} dispatch={dispatch} />}
            <TodosList
                listTodos={listTodos}
                dispatch={dispatch}
                isCompletedHidden={isCompletedHidden}
                setHideCompleted={setHideCompleted}
            />
            {List.isList(listTodos) &&
                listTodos.size > 0 &&
                listTodos.find((data) => data.get('isCompleted')) && (
                    <HideChecked
                        isCompletedHidden={isCompletedHidden}
                        setHideCompleted={setHideCompleted}
                    />
                )}
        </div>
    );
}

export default App;
