import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { Checkbox, Flex } from 'gestalt';

import KitchenetteButton from '../inputs/KitchenetteButton'
import { cookedRecipeToastData } from '../feedback/toastsData'

import { cookRecipe } from '../../api/provider';
import { UserContext } from '../../auth/UserContext'

// A narrow rectangle showing details about a recipe
const RecipePaper = ({recipe, onClickUnsave}) => {
  const { userData } = useContext(UserContext) // get user data
  var { token } = userData ? userData : {token: 'wrong token'} // set a valid token for now

  const [ingredients, setIngredients] = useState([])

  // list of instruction objects: [{name: <string>, checked: <boolean> }, ...]
  const [instructionsList, setInstructionsList] = useState(null)

  useLayoutEffect(() => {
    if (!recipe) return;
    // turn list of ingredient names into list of ingredient objects containsing name and checked state
    setIngredients(recipe.ingredients.map(ingredientName => ({name: ingredientName, checked: false})))

    setInstructionsList(recipe.instructions)
  }, [recipe])

  function onClickUseRecipe() {
    return cookRecipe(token, {recipe_input: recipe.ingredients, recipe_output: recipe.name})
    .then( (response) => {
      console.log(response);
      return response.success
    })
    .catch(err => { console.log(err) });
  }

  if (!recipe) return;

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
        <KitchenetteButton displayLabel="use recipe" onClick={onClickUseRecipe}
          toastData={cookedRecipeToastData()}
          />
        <button className="button" onClick={() => onClickUnsave(recipe.recipe_id)}>unsave</button>
      </div>
    </div>
    </div>
  );
}

export default RecipePaper;
