import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../auth/UserContext'
import '../Page.css';
import image from '../styles/undraw_cooking.png'
const Authentication = () => {
  document.title = "Welcome"

  const {userData, setUserData} = useContext(UserContext) // access user data

  function login() {
    setUserData({
      user: {username: 'python122', user_id: 1},
      token: 'token123'
    })
  }

  return (
    <div id="content" className="page-content">
      <div style={{display: 'flex', height: '100vh', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {/* left side */}
        <div style={{minWidth: '500px', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection: 'column'}}>
          { userData ?
            <> {/* show user info if they're logged in */}
              <h1>welcome, <br/>{userData.user.username}</h1>
            </> :
            <> {/* show log in prompt for users not logged in */}
              <p>Username</p>
              <input className="input"/>

              <br/>
              <p>Password</p>
              <input className="input"/>

              <br/> {/* login and sign in buttons */}
              <div style={{display: 'flex', minWidth: '300px', alignItems: 'center', justifyContent: 'space-around', marginTop: '20px'}}>
                <button className="button">sign up</button>
                <button className="button" onClick={login}>login</button>
              </div>
            </>
          }
        </div>

        {/* right side */}
        <div style={{minWidth: '500px', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <img className="float-image" src={image} width="500px"/>
          <h2 className="salmon-text">organize your cooking</h2>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
