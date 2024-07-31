import React, { useState } from 'react';
import './Todo.css';

const Todo = ({ todo, index, toggleComplete, deleteTodo }) => {
  
  

  const todoClass = `todo ${todo.completed ? 'completed' : ''} ${todo.category}`;

  return (
    <div className={todoClass} style={{ 
      background: `linear-gradient(145deg, ${getGradientColour(todo.category)}, #ffffff)`
    }}>
      <input 
        type="checkbox" 
        checked={todo.completed} 
        onChange={() => toggleComplete(index)} 
      />
      <span onClick={() => toggleComplete(index)}>{todo.text}</span>
      <button onClick={() => deleteTodo(index)}>Delete</button>
      
    </div>
  );
};

function getGradientColour(category) {
  switch (category) {
    case 'Work':
      return '#cf8282, #ffffff';
    case 'Personal':
      return 'lightblue, #ffffff';
    case 'School':
      return 'rgb(159, 181, 159), #ffffff';
    default:
      return '#cf8282, #ffffff'; // Default to Work gradient if category doesn't match
  }
}

export default Todo;
