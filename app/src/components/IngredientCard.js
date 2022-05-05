import React, { useState, useEffect } from 'react';
import { IconButton } from 'gestalt';

// A card showing details about an ingredient
const IngredientCard = ({ingredient, classNames}) => {
  return (
    <div className={`section ingredient-card ${classNames}`} key={ingredient.name}>
      <h1>{ingredient.quantity} {ingredient.name}</h1>

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
            tooltip={{
              text: "Stock up",
              accessibilityLabel: "Increment quantity",
              idealDirection: "up"
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
            tooltip={{
              text: "Use up",
              accessibilityLabel: "Use one serving of",
              idealDirection: "up"
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default IngredientCard;
