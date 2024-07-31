import React from 'react';
import Todo from './Todo';
import './TodoList.css';

const TodoList = ({ todos, toggleCompleted, deletedTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <Todo
          key={index}
          index={index}
          todo={todo}
          toggleComplete={toggleCompleted}
          deleteTodo={deletedTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
