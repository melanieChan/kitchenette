import React, { useState, useEffect } from 'react';
import '../Page.css';
import RecipeCard from '../components/RecipeCard'
import MultiSelect from '../components/MultiSelect'

const RecipeSearchPage = () => {
  document.title = "Search Recipes"

  const [recipeSearchResults, setRecipeSearchResults] = useState(null);

  useEffect(() => {
    setRecipeSearchResults([
      {name: 'recipe1', quantity: 5},
      {name: 'recipe2', quantity: 6},
      {name: 'recipe3', quantity: 3},
    ])
  }, [])

  return (
    <div id="content">

      {/* section to add item */}
      <div className="content-head">
        <div className="searchbar-section">
          <p>Enter ingredients to search</p>
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', minWidth: '500px'}}>
              <MultiSelect
                placeholder="ingredients"
                />

              {/* submit button */}
              <button className="button" style={{height: '2.5em'}} >search</button>
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
