import { toHaveTextContent } from '@testing-library/jest-dom/dist/matchers';
import { render, screen, fireEvent, getByTestId, getByText } from '@testing-library/react';
import App from '../App';

// Jest hooks:
// https://jestjs.io/docs/setup-teardown

// A describe block groups your tests together and locally scoped Jest hooks
describe('Testing Initial <App/> state', () => {

  // test #1
  test('renders a todo list', () => {

    render(<App />);

    // RTL: https://testing-library.com/docs/queries/byrole
    // ARIA: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/list_role
    const todoList = screen.getByRole('list');
    expect(todoList).toBeInTheDocument();
  });

  // test #2
  test('renders a todo', () => {
    
    render(<App />);

    // RTL: https://testing-library.com/docs/queries/bytext
    const todo = screen.getByText('React Hooks in Depth');
    expect(todo).toBeInTheDocument();
  });

   // test #3
   test('renders 3 intial todos', () => {
    
      const todos = render(<App />);
      
      // RTL: https://testing-library.com/docs/queries/bytestid/
      const todoCountElement = todos.getByTestId('todoCount');
      
      // jest-dom: https://github.com/testing-library/jest-dom#tohavetextcontent
      expect(todoCountElement).toHaveTextContent('3 todos');
   });
});

describe('Testing <TodoForm />', () => {
  
  // test #1
  test('renders an input to add a todo', () => {

    render(<App />);
    
    // RTL: https://testing-library.com/docs/queries/byrole
    // ARIA: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/textbox_role
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  // test #2
  test('a new todo is added', async () => {
    
    render(<App />);

    // RTL: https://testing-library.com/docs/queries/byrole
    const input = screen.getByRole("textbox");
    const form = screen.getByRole('form');
    
    fireEvent.change(input, { target: { value: 'New Todo' } });   
    fireEvent.submit(form);
    
    // RTL: https://testing-library.com/docs/queries/bytext
    const todo = screen.getByText('New Todo');
    expect(todo).toBeInTheDocument();
  });

});

// TODO: Add tests for the <Todo /> component
describe('Testing <Todo/> functionality', () => {

  test('a new todo is deleted', async () => {
    const todos= render(<App />);

    // RTL: https://testing-library.com/docs/queries/byrole
    const buttonErase = screen.getAllByTestId('erase');
    const counter = todos.getByTestId('todoCount');
    
    fireEvent.click(buttonErase[2]);
    
    // RTL: https://testing-library.com/docs/queries/bytext
    await expect(counter.textContent).toBe('2 todos');
    
  });

  test('a new todo is completed', async () => {

    const todos= render(<App />);

    // RTL: https://testing-library.com/docs/queries/byrole
    const buttonErase = screen.getAllByTestId('mark');
    
    fireEvent.click(buttonErase[2]);
    
    // RTL: https://testing-library.com/docs/queries/bytext
    await expect(buttonErase[2].textContent).toBe("Not done");
  
  });

});