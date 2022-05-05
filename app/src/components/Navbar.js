import React from 'react';
import './Navbar.css';

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate() // used to change pages

  var currentPath = window.location.pathname; // suffix of current link url

  // names of pages and their paths
  const paths = [
    {name: 'My Pantry', route: '/pantry'},
    {name: 'Search Recipe', route: '/search'},
    {name: 'My Cookbook', route: '/search'},
  ]

  const changeRoute = (route) => {
    // goes to new page if the route is different
    if (route !== currentPath)
      navigate(route)
  }

  return(
    <>
      <div className="header overlay">
        <div className="left-header">
          <h1 id="title">Recipe App</h1>

          {/* horizontal row of tabs that user can click on to go to a different page */}
          {paths.map(path =>
            <p
              // if current path is the same as what this path links to, it will be disabled
              className={path.route === currentPath ? 'tab-current' : "tab-title"}
              onClick={() => changeRoute(path.route)}
              >{path.name}</p>
          )}
        </div>

        <button className="button">Log in</button>
      </div>

      {/* this div has no real functionality, it is only to fix styling */}
      <div className="header">
        <div className="left-header">
          <h1 id="title">X</h1>
        </div>
      </div>
    </>
  );
}

export default Navbar;
