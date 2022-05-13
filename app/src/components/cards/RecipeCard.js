import React, { useState, useEffect, useContext } from 'react';

import { saveRecipe } from '../../api/provider';
import { UserContext } from '../../auth/UserContext'

// A card showing details about a recipe
const RecipeCard = ({recipe}) => {
  const { userData } = useContext(UserContext) // get user data
  var { token } = userData ? userData : {token: 'null'} // set a valid token for now

  const [instructionsList, setInstructionsList] = useState(null) // list of strings representing list of instructions

  useEffect(() => {
    setInstructionsList(recipe.instructions)
  }, [recipe])

  // ran after user clicks save button
  function saveRecipeToDB() {
    saveRecipe(token, ({recipe_id: recipe.recipe_id})) // pass in data through parameters
      .then( (response) => {
        console.log(response);

        // let the user know that it was saved
        if (response.success)
          alert('recipe saved')
        else {
          alert('already saved')
        }
      })
      .catch(err => { console.log(err) });
  }

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
        <button className="button" onClick={saveRecipeToDB}>save</button>
      </div>
    </div>
  );
}

export default RecipeCard;
