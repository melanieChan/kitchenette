import React, { useState, useEffect, useContext } from 'react';
import '../Page.css';
import RecipeCard from '../components/cards/RecipeCard'
import MultiSelect from '../components/inputs/MultiSelect'

import { searchRecipesByIngredients } from '../api/provider';
import { UserContext } from '../auth/UserContext'

const RecipeSearchPage = () => {
  document.title = "Search Recipes"
  const {userData} = useContext(UserContext) // access user data
  const {token} = userData ? userData : {token: 'null'}

  const [selected, setSelected] = useState([]); // items user has selected
  const [recipeSearchResults, setRecipeSearchResults] = useState(null);

  // takes list of ingredients selected from MultiSelect input component and uses them as the search query
  function search() {
    // call api
    searchRecipesByIngredients(token, selected)
      .then((response) => {
        console.log(response);

        // update ui
        setRecipeSearchResults(response)
      })
      .catch(err => { console.log(err) });
  }

  return (
    <div className="content">

      {/* section to add item */}
      <div className="content-head">
        <div className="searchbar-section">
          <p>Enter ingredients to search</p>
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', minWidth: '500px'}}>
              <MultiSelect
                placeholder="ingredients"
                selected={selected}
                setSelected={setSelected}
                />

              {/* submit button */}
              <button className="button" style={{height: '2.5em'}}
                onClick={search}>search</button>
            </div>
          </div>
        </div>
      </div>

      {/* list of items */}
      <div className="list">
        {recipeSearchResults &&
          recipeSearchResults.map(item =>
            <RecipeCard recipe={item}/>
        )}
      </div>

    </div>
  );
}

export default RecipeSearchPage;
