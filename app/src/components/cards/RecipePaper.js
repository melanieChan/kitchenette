import React, { useState, useEffect,useLayoutEffect } from 'react';
import { Checkbox, Flex } from 'gestalt';

// A narrow rectangle showing details about a recipe
const RecipePaper = ({recipe}) => {
  const [ingredients, setIngredients] = useState([])

  useLayoutEffect(() => {
    setIngredients([
      {name: 'apple', checked: false},
      {name: 'raspberries', checked: false},
      {name: 'grapes', checked: false},
    ])
  }, [])

  return (
    <div className="page recipe-card" key={recipe.name}>
      <h1>{recipe.name}</h1>
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

      <p>step-by-step instructions</p>
      <div>
        <button className="button">use recipe</button>
        <button className="button">buy ingredients</button>
        <button className="button">unsave</button>
      </div>
    </div>
  );
}

export default RecipePaper;
