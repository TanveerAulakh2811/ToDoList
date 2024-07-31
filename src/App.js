import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('All'); // Default category is 'All'

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Update localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() !== '') {
      const newTodo = { text: input, completed: false, category };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleCompleteFunction = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodoFunction = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter((todo) =>
    category === 'All' ? true : todo.category === category
  );

  return (
    <div className="App">
      <Navbar currentCategory={category} setCategory={setCategory} />
      <header className="App-header">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </header>
      <TodoList
        todos={filteredTodos}
        toggleCompleted={toggleCompleteFunction}
        deletedTodo={deleteTodoFunction}
      />
    </div>
  );
}

export default App;
