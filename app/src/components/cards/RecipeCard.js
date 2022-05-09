import React, { useState, useEffect, useContext } from 'react';

// A card showing details about a recipe
const RecipeCard = ({recipe}) => {
  const [instructionsList, setInstructionsList] = useState(null) // list of strings representing list of instructions

  useEffect(() => {
    // process instructions list
    // remove these 2 characters that may surround some words: \"
    // turn into array of steps
    setInstructionsList(recipe.instructions.replace('\\"','').split("\", \""))
  }, [recipe])

  return (
    <div className="section recipe-card" key={recipe.name}>
      <h1>{recipe.name}</h1>

      <ul> {/* ingredient list */}
        <p>Ingredients</p>
        {recipe.ingredients &&
          recipe.ingredients.map(ingredient => <li>{ingredient}</li>)
        }
      </ul>

      <ol>
        <p>Instructions</p>
        {instructionsList && instructionsList.map(step => <li>{step}</li>)}
      </ol>

      <div>
        <button className="button">save</button>
      </div>
    </div>
  );
}

export default RecipeCard;
