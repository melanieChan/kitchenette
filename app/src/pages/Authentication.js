import React, { useState, useEffect, useContext } from 'react';
import '../Page.css';
import '../styles/gestaltOverride.css';
import image from '../styles/undraw_cooking.png'

import { IconButton, Module, Link, TextField, Checkbox } from 'gestalt'

import { UserContext } from '../auth/UserContext'
import { loginAuth } from '../api/provider';

const Authentication = () => {
  document.title = "Kitchenette"

  const {userData, setUserData} = useContext(UserContext) // access user data

  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const [usernameError, setUsernameError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const [authError, setAuthError] = useState(null)

  // controls checkbox display
  const [checkedDemoAutofill, setDemoCheckedAutofill] = useState(false)

  // check if value is empty
  function isValidInput(value) {
    if (value == '') {
      return false
    } else {
      return true
    }
  }

  // sets error for invalid inputs
  function validateInput(value, errorSetter, errorMessage) {
    if (isValidInput(value)) {
      errorSetter(null)
      return true
    } else {
      errorSetter(errorMessage)
      return false
    }
  }

  function validateUsername(value) {
    return validateInput(value, setUsernameError, 'Username must have at least 1 character')
  }

  function validatePassword(value) {
    return validateInput(value, setPasswordError, 'Password must have at least 1 character')
  }

  const handleInputChange = (...[{value}, validInputFn, stateUpdater]) => {
    // check and update display of inputs
    validInputFn(value)
    stateUpdater(value)
    
    setAuthError(null) // clear error message from previous register/login attempt
  }

  function login() {
    // check inputs before calling api
    if (!validateUsername(usernameInput) || !validatePassword(passwordInput)) {
      return
    }

    loginAuth(usernameInput, passwordInput)
      .then( (response) => {
        // after data received, update UI with user info
        if (response.success) {
          setUserData({
            user: response.user,
            token: 'token123'
          })

          // clear input fields
          setAuthError(null)
          setUsernameError(null)
          setPasswordError(null)
          setUsernameInput('')
          setPasswordInput('')
          setDemoCheckedAutofill(false)
        } else {
          setAuthError(response.msg)
        }
      })
      .catch(err => { console.log(err) });
  }

  const autofillWithDemoAccount = ({ checked }) => {
    setDemoCheckedAutofill(checked) // check or uncheck the box

    // change fields based on user choice
    if (checked) {
      setUsernameInput('pandas')
      setPasswordInput('dataframe')
      setUsernameError(null)
      setPasswordError(null)
    } else {
      setUsernameInput('')
      setPasswordInput('')
    }
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
              <TextField
                  id="gestaltTextField"
                  onChange={e => handleInputChange(e, validateUsername, setUsernameInput)}
                  value={usernameInput}
                  label='Username' type="text"
                  errorMessage={usernameError ? usernameError : ''}
                  />

              <br/>
              <TextField
                  id="gestaltTextField"
                  onChange={e => handleInputChange(e, validatePassword, setPasswordInput)}
                  value={passwordInput}
                  label='Password' type="password"
                  errorMessage={passwordError ? passwordError : ''}
                  />

              <br/>
              <Checkbox
                checked={checkedDemoAutofill}
                id="checkbox"
                label="Autofill with demo account data"
                onChange={autofillWithDemoAccount}
              />

              <br/> {/* login and sign in buttons */}
              <div style={{display: 'flex', minWidth: '300px', alignItems: 'center', justifyContent: 'space-around', marginTop: '20px'}}>
                <button className="button">sign up</button>
                <button className="button" onClick={login}>login</button>
              </div>

              {/* show any errors after signup/login attempt */
                authError && <p style={{color: 'tomato'}}>{authError}</p>
              }
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
