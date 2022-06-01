import React, { useState, useEffect, useContext } from 'react';
import { IconButton } from 'gestalt';

import { updatePantryItemQuantity } from '../../api/provider';
import { UserContext } from '../../auth/UserContext'

// A card showing details about an ingredient
const IngredientCard = ({ingredient, classNames, onDelete}) => {
  const { userData } = useContext(UserContext) // get user data
  var { token } = userData ? userData : {token: 'wrong token'} // set a valid token for now

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
    else {
      // updates value stored in database
      updatePantryItemQuantity(token, {new_quantity: newQuantity, ingredient_id: ingredient.ingredient_id})
      .then( (response) => {
        console.log(response);

        // show the new value
        if (response.newQuantity) {
          setQuantity(response.newQuantity)
        }
      })
      .catch(err => { console.log(err) });
    }
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
