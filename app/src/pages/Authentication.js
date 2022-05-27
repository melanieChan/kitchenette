import React, { useState, useEffect, useContext } from 'react';
import '../Page.css';
import image from '../styles/undraw_cooking.png'

import { IconButton, Module, Link } from 'gestalt'

import { UserContext } from '../auth/UserContext'

const Authentication = () => {
  document.title = "Kitchenette"

  const {userData, setUserData} = useContext(UserContext) // access user data

  function login() {
    setUserData({
      user: {username: 'python122', user_id: 1},
      token: 'token123'
    })
  }

  return (
    <div className="content">
       <div style={{display: 'flex', height: '100%', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
        {/* left side */}
        <div style={{minWidth: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          { userData ?
            <> {/* show user info if they're logged in */}
              <h1 className="salmon-text">welcome, <br/>{userData.user.username}</h1>
              <p>Click on <IconButton accessibilityLabel="Icon Button display" icon="question-mark" /> at the top right for more description on features.</p>
              <div style={{width: '100%'}}>
                <Module.Expandable
                  accessibilityExpandLabel="Expand the module"
                  accessibilityCollapseLabel="Collapse the module"
                  id="ModuleExample - default"
                  items={[
                    {
                      children: <>
                        <p>Recipe data from this <Link inline target="blank" href="https://www.kaggle.com/datasets/irkaal/foodcom-recipes-and-reviews?select=recipes.csv">
                            Kaggle dataset
                          </Link>
                        </p>
                        <p>Graphics from <Link inline target="blank" href="https://undraw.co/">
                            Undraw
                          </Link>
                        </p>
                      </>,
                      summary: [],
                      title: 'Credits',
                    }]}>
                </Module.Expandable>
              </div>
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
        <div style={{ height: '80%', width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <img className="float-image" src={image} />
          <h2>organize your cooking</h2>
        </div>
      </div>
    </div>
  );
}

export default Authentication;
