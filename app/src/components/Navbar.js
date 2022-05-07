import React, { useContext, useRef, useState } from 'react';
import { UserContext } from '../auth/UserContext'
import './Navbar.css';

import { Popover, Layer } from 'gestalt';
import { useNavigate } from "react-router-dom";

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
          <h1 id="title" onClick={() => changeRoute('/')}>Recipe App</h1>

          {/* horizontal row of tabs that user can click on to go to a different page */}
          {paths.map(path =>
            <p
              // if current path is the same as what this path links to, it will be disabled
              className={path.route === currentPath ? 'tab-current' : "tab-title"}
              onClick={() => changeRoute(path.route)}
              >{path.name}</p>
          )}
        </div>

        <UserButton/>
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

// shows username and logout option
const UserButton = () => {
  const {userData, setUserData} = useContext(UserContext) // access user data

  const userBtnRef = useRef(null)
  const [openPopover, setOpenPopover] = useState(false)

  function logout() {
    setUserData(null)
    setOpenPopover(false)
  }

  if (!userData) return <></>

  return (
    <>
      <button className="button"
        ref={userBtnRef}
        onClick={() => setOpenPopover(!openPopover) }
        >{userData ? userData.user.username : 'log in'}</button>

      {openPopover &&
        <Popover
          anchor={userBtnRef.current}
          id="popover-user-btn"
          idealDirection="down"
          onDismiss={() => setOpenPopover(false) }
          positionRelativeToAnchor={true}
          size="lg"
          >
          <button className="logout-btn" onClick={logout}>logout</button>
        </Popover>
      }
    </>
  );
}
