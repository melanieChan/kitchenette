import React, { useContext, useRef, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

import './Navbar.css';

import UserButton from './UserButton'

import { UserContext } from '../../auth/UserContext'

const Navbar = () => {
  const {userData, setUserData} = useContext(UserContext) // access user data

  let navigate = useNavigate() // used to change pages

  var currentPath = window.location.pathname; // suffix of current link url

  // names of pages and their paths
  const paths = [
    {name: 'My Pantry', route: '/pantry'},
    {name: 'Search Recipe', route: '/search'},
    {name: 'My Cookbook', route: '/cookbook'},
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
        <Link to="/">
          <h1 id="title">Kitchenette</h1>
        </Link>

          {/* horizontal row of tabs that user can click on to go to a different page */}
          {userData && paths.map(path =>
            <Link
              className={path.route === currentPath ? 'tab-current' : "tab-title"}
              to={path.route}>
                {path.name}
            </Link>
          )}
        </div>

        <UserButton/>
      </div>
    </>
  );
}

export default Navbar;
