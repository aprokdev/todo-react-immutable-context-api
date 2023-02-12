import * as React from 'react';
import CreateTodo from '~components/create-todo';
import TodosList from '~components/todos-list';
import { useTodos } from '~todo-context/index';
import './app.scss';

function App() {
    const contextValues = useTodos();
    return (
        <div className="app">
            <h1 className="app__title">Todo List</h1>
            <CreateTodo {...contextValues} />
            <TodosList {...contextValues} />
        </div>
    );
}

export default App;
