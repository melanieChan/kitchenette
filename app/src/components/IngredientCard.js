import React, { useState, useEffect } from 'react';

// A card showing details about an ingredient
const IngredientCard = ({ingredient, classNames}) => {
  return (
    <div className={`section ingredient-card ${classNames}`} key={ingredient.name}>
      <h1>{ingredient.quantity} {ingredient.name}</h1>
      <div>
        <button>+ stock up</button>
        <button>- use up</button>
      </div>
    </div>
  );
}

export default IngredientCard;
