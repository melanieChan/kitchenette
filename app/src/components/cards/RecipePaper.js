import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Checkbox, Flex } from 'gestalt';

import { cookRecipe } from '../../api/provider';
import { UserContext } from '../../auth/UserContext'

// A narrow rectangle showing details about a recipe
const RecipePaper = ({recipe}) => {
  const { userData } = useContext(UserContext) // get user data
  var { token } = userData ? userData : {token: 'null'} // set a valid token for now

  const [ingredients, setIngredients] = useState([])

  // list of instruction objects: [{name: <string>, checked: <boolean> }, ...]
  const [instructionsList, setInstructionsList] = useState(null)

  useLayoutEffect(() => {
    // turn list of ingredient names into list of ingredient objects containsing name and checked state
    setIngredients(recipe.ingredients.map(ingredientName => ({name: ingredientName, checked: false})))

    // process instructions as string into list
    setInstructionsList(recipe.instructions.replace('\\"','').split("\", \""))
  }, [recipe])

  function onClickUseRecipe() {
    cookRecipe(token, {recipe_input: recipe.ingredients, recipe_output: recipe.name})
    .then( (response) => {
      console.log(response);

      // let the user know that it was used
      if (response.success)
        alert('Recipe used. Any pantry ingredients used for this recipe have been decremented. A serving of this recipe has also been added to your pantry.')
    })
    .catch(err => { console.log(err) });
  }

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
        <button className="button" onClick={onClickUseRecipe}>use recipe</button>
        <button className="button">buy ingredients</button>
        <button className="button">unsave</button>
      </div>
    </div>
    </div>
  );
}

export default RecipePaper;
