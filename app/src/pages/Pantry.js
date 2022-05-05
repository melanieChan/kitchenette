import React, { useState, useEffect } from 'react';
import '../Page.css';

import Select from '../components/Select'
import IngredientCard from '../components/IngredientCard'

const Pantry = () => {
  document.title = "Pantry"

  const [newIngredientInput, setNewIngredientInput] = useState('')
  const [pantryItems, setPantryItems] = useState(null);

  useEffect(() => {
    setPantryItems([
      {name: 'apples', quantity: 5},
      {name: 'blueberries', quantity: 6},
      {name: 'oranges', quantity: 3},
    ])
  }, [])

  // adds a new item to the list of ingredients
  function addItem() {
    const newIngredientData = {
      name: newIngredientInput,
      quantity: 5,
      classNames: 'newItem' // passed to display card for styling
    }
    // adds to beginning of list
    var pantryItemsCopy = [newIngredientData, ...pantryItems]
    setPantryItems(pantryItemsCopy) // updates display
  }

  return (
    <div id="content">

      {/* section to add item */}
      <div className="content-head">
        <div className="searchbar-section">
          <p>Enter an item to add</p>
          <div style={{display: 'flex', justifyContent: 'space-between', minWidth: '500px'}}>
            {/* input field */}
            <Select
              placeholder="new item"
              setSelection={setNewIngredientInput}/>

            {/* submit button */}
            <button className="button" onClick={addItem}>add item</button>
          </div>
        </div>
      </div>

      {/* list of items */}
      <div className="list">
        {pantryItems &&
          pantryItems.map(item =>
            <IngredientCard
              key={item}
              ingredient={item}
              classNames={item.classNames}
              />
        )}
      </div>

    </div>
  );
}

export default Pantry;
