import React, { useState, useEffect, useRef } from 'react';
import '../Page.css';

import Select from '../components/Select'
import IngredientCard from '../components/IngredientCard'

import { NumberField } from 'gestalt';

const Pantry = () => {
  document.title = "Pantry"

  const [newIngredientInput, setNewIngredientInput] = useState('')
  const [newIngredientQuantity, setNewIngredientQuantity] = useState(0)

  const [pantryItems, setPantryItems] = useState(null);

  const quantityInputRef = useRef()
  useEffect(() => {
    setPantryItems([
      {name: 'apples', quantity: 5},
      {name: 'blueberries', quantity: 6},
      {name: 'oranges', quantity: 3},
    ])
  }, [])

  useEffect(() => {
    // style quantity input field
    quantityInputRef.current.style.boxShadow = '0 0 0 coral'
    quantityInputRef.current.style.border = '1px solid coral'
    quantityInputRef.current.style.width = '5em'
  }, [])

  // adds a new item to the list of ingredients
  function addItem() {
    // invalid inputs
    if (!newIngredientQuantity || !newIngredientInput) return

    const newIngredientData = {
      name: newIngredientInput,
      quantity: newIngredientQuantity,
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
          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', minWidth: '500px'}}>
            {/* input field */}
            <Select
              label="Item name"
              placeholder="new item"
              setSelection={setNewIngredientInput}/>

            {/* input field for item quantity */}
            <NumberField
              id="quantity-input"
              ref={quantityInputRef}
              label="Quantity"
              onChange={({ value }) => {
                setNewIngredientQuantity(value);
              }}
              value={newIngredientQuantity}
            />

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
