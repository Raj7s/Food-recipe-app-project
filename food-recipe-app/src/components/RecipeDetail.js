// src/components/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the recipe ID from the URL

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals) {
          setRecipe(response.data.meals[0]);
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching recipe details:', error);
      }
      setLoading(false);
    };

    fetchRecipeDetail(); // Fetch recipe details based on ID
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {recipe && (
        <>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>Ingredients</h3>
          <ul>
            {Object.keys(recipe)
              .filter((key) => key.includes('strIngredient') && recipe[key])
              .map((key, index) => (
                <li key={index}>{recipe[key]}</li>
              ))}
          </ul>
          <h3>Instructions</h3>
          <p>{recipe.strInstructions}</p>
        </>
      )}
    </div>
  );
};

export default RecipeDetail;
