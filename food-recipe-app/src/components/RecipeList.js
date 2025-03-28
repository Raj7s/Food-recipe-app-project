// src/components/RecipeList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Use Link for routing

const RecipeList = ({ query }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch recipes whenever the search query changes
  useEffect(() => {
    if (!query) return; // Don't fetch if no query

    const fetchRecipes = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
        );

        if (response.data.meals) {
          setRecipes(response.data.meals); // Set recipes if found
        } else {
          setRecipes([]); // No recipes found
          setError(`No recipes found for "${query}"`);
        }
      } catch (error) {
        setError('Error fetching recipes');
        console.error(error);
      }
      setLoading(false);
    };

    fetchRecipes(); // Call the function to fetch recipes
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Recipe List</h2>
      <ul>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <li key={recipe.idMeal}>
              <Link to={`/recipe/${recipe.idMeal}`}>{recipe.strMeal}</Link>
            </li>
          ))
        ) : (
          <p>After your search recipe list will show below.</p>
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
