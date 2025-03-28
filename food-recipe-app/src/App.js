// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // For routing
import RecipeList from './components/RecipeList'; // Import RecipeList component
import RecipeDetail from './components/RecipeDetail'; // Import RecipeDetail component
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // To search query state

  // Handle form submission for search
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.search.value); // In order to Update search query
  };

  return (
    <Router> {/* Wrap everything in Router */}
      <div className="app">
        <h1>Deepak's Food Recipe App</h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            name="search"
            placeholder="Search for a recipe..."
          />
          <button type="submit">Search</button>
        </form>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<RecipeList query={searchQuery} />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
