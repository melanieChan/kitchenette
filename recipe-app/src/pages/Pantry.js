import React, { useState, useEffect } from 'react';
import './Pantry.css';

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState(null);

  useEffect(() => {
    setPantryItems([
      {name: 'apples', quantity: 5},
      {name: 'blueberries', quantity: 6},
      {name: 'oranges', quantity: 3},
    ])
  }, [])

  return (
    <div id="content">

      {/* section to add item */}
      <div className="content-head">
        <div className="searchbar-section">
          <p>Enter an item to add</p>
          <div>
            <input placeholder="new item"/>
            <button>add item</button>
          </div>
        </div>
      </div>

      {/* list of items */}
      <div className="list">
        {pantryItems &&
          pantryItems.map(item =>
            <div className="section">
              <h1>{item.quantity} {item.name}</h1>
              <div>
                <button>+ stock up</button>
                <button>- use up</button>
              </div>
            </div>
        )}
      </div>

    </div>
  );
}

export default Pantry;
