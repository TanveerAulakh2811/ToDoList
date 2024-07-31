import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ currentCategory, setCategory }) {
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState(['All', 'Work', 'Personal', 'School']); // Initialize with predefined categories
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');

  const handleCustomCategory = (e) => {
    if (e.key === 'Enter' && customCategory.trim() !== '') {
      setCategory(customCategory);
      setCustomCategory(''); // Clear input after setting category

      // Update categories state with the new custom category if not already included
      if (!categories.includes(customCategory)) {
        setCategories([...categories, customCategory]);
      }
    }
  };

  const showDeleteConfirmation = (category) => {
    setDeleteConfirmation(true);
    setCategoryToDelete(category);
  };

  const confirmDeleteCategory = () => {
    const updatedCategories = categories.filter((category) => category !== categoryToDelete);
    setCategories(updatedCategories);
    // If the deleted category was selected, switch to 'All'
    if (currentCategory === categoryToDelete) {
      setCategory('All');
    }
    setDeleteConfirmation(false);
  };

  const cancelDeleteCategory = () => {
    setDeleteConfirmation(false);
    setCategoryToDelete('');
  };

  return (
    <nav className="navbar">
      <ul>
        {categories.map((category) => (
          <li
            key={category}
            className={currentCategory === category ? 'active' : ''}
            onClick={() => setCategory(category)}
          >
            {category}
            {category !== 'All' && (
              <button className="delete-button" onClick={() => showDeleteConfirmation(category)}>
                x
              </button>
            )}
          </li>
        ))}
        <li>
          <input
            type="text"
            placeholder="Custom Category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            onKeyDown={handleCustomCategory}
          />
        </li>
      </ul>

      {/* Confirmation Dialog */}
      {deleteConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete "{categoryToDelete}"?</p>
          <button onClick={confirmDeleteCategory}>Delete</button>
          <button onClick={cancelDeleteCategory}>Cancel</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
