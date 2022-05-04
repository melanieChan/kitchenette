import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return(
    <>
      <div className="header overlay">
        <div className="left-header">
          <h1 id="title">Recipe App</h1>
          <p className="tab-title">My Pantry</p>
          <p className="tab-title">Search Recipe</p>
          <p className="tab-title">My Recipes</p>
        </div>

        <button>Log in</button>
      </div>

      <div className="header">
        <div className="left-header">
          <h1 id="title">X</h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;
