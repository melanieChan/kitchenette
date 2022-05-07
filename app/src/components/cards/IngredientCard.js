import React, { useState, useEffect } from 'react';
import { IconButton } from 'gestalt';

// A card showing details about an ingredient
const IngredientCard = ({ingredient, classNames, onDelete}) => {
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    // get data from params
    setQuantity(ingredient.quantity)
  }, [ingredient])

  function changeQuantity(newQuantity) {
    // delete item if it's all used up
    if (newQuantity <= 0) {
      onDelete(ingredient)
    }

    setQuantity(newQuantity)
  }

  return (
    <div className={`section ingredient-card ${classNames}`} key={ingredient.name}>
      <h1>{quantity} {ingredient.name}</h1>

      {/* increment and decrement buttons */}
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
        <div className="icon-button-container" style={{width: '48px'}}>
          <IconButton
            accessibilityLabel="Edit"
            icon="add"
            bgColor="lightGray"
            iconColor="darkGray"
            size="lg"
            selected={false}
            onClick={() => changeQuantity(quantity + 1)}
            tooltip={{
              text: "Stock up",
              accessibilityLabel: "Increment quantity",
              idealDirection: "down"
            }}
          />
        </div>
        <div className="icon-button-container" style={{width: '48px'}}>
          <IconButton
            accessibilityLabel="Edit"
            icon="dash"
            bgColor="lightGray"
            iconColor="darkGray"
            size="lg"
            onClick={() => changeQuantity(quantity - 1)}
            tooltip={{
              text: "Use up",
              accessibilityLabel: "Use one serving of",
              idealDirection: "down"
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default IngredientCard;
