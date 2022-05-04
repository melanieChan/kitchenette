import React, { useState, useEffect } from 'react';
import '../Page.css';

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
            <input placeholder="ingredients"/>
            <button>search</button>
          </div>
        </div>
      </div>

      {/* list of items */}
      <div className="list">
        {recipeSearchResults &&
          recipeSearchResults.map(item =>
            <div className="section">
              <h1>{item.name}</h1>
              <p>ingredient list</p>
              <p>step-by-step instructions</p>
              <div>
                <button>save</button>
              </div>
            </div>
        )}
      </div>

    </div>
  );
}

export default RecipeSearchPage;
