import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Checkbox, Flex } from 'gestalt';

// A narrow rectangle showing details about a recipe
const RecipePaper = ({recipe}) => {
  const [ingredients, setIngredients] = useState([])

  // list of instruction objects: [{name: <string>, checked: <boolean> }, ...]
  const [instructionsList, setInstructionsList] = useState(null)

  useLayoutEffect(() => {
    // turn list of ingredient names into list of ingredient objects containsing name and checked state
    setIngredients(recipe.ingredients.map(ingredientName => ({name: ingredientName, checked: false})))

    // process instructions as string into list
    setInstructionsList(recipe.instructions.replace('\\"','').split("\", \""))
  }, [recipe])

  return (
    <div className="page recipe-card scroll" key={recipe.name}>
    <div className="recipe-paper-content">
      <h1>{recipe.name}</h1>

      {/* ingredient checklist */}
      <Flex direction="column" gap={2}>
        {ingredients.map((ingredient, index) =>
          <Checkbox
            checked={ingredients[index].checked}
            id="english"
            label={ingredient.name}
            name="english"
            onChange={({ checked }) => {
              var newIngredients = [...ingredients]
              newIngredients[index].checked = checked
              setIngredients(newIngredients)
            }}
          />
        )}
      </Flex>

      <ol> {/* instructions list */}
        {instructionsList && instructionsList.map(step => <li>{step}</li>)}
      </ol>

      <div className="center"> {/* buttons on bottom of paper */}
        <button className="button">use recipe</button>
        <button className="button">buy ingredients</button>
        <button className="button">unsave</button>
      </div>
    </div>
    </div>
  );
}

export default RecipePaper;
