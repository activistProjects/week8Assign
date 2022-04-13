import React from "react";

function Todo({ todo, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(todo.id)} data-testid= 'mark'>
          {todo.isCompleted ? "Not done" : "Done"}
        </button>
        <button onClick={() => removeTodo(todo.id)} data-testid= 'erase'>x</button>
      </div>
    </div>
  );
}

export default Todo;