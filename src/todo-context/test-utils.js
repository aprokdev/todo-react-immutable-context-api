import { render } from '@testing-library/react';
import { TodoProvider } from '@todo-context/index';

export function renderWithTodoProvider(ui, renderOptions) {
    function Wrapper({ children }) {
        return <TodoProvider>{children}</TodoProvider>;
    }
    return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
