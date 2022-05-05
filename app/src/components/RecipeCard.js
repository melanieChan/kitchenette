import React, { useState, useEffect } from 'react';

// A card showing details about a recipe
const RecipeCard = ({recipe}) => {
  return (
    <div className="section recipe-card" >
      <h1>{recipe.name}</h1>
      <p>ingredient list</p>
      <p>step-by-step instructions</p>
      <div>
        <button className="button">save</button>
      </div>
    </div>
  );
}

export default RecipeCard;
