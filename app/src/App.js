import './App.css';
import React, { useState, useEffect } from 'react';
import { UserContext } from './auth/UserContext'
import PrivateRoute from './auth/PrivateRoute'

import Authentication from './pages/Authentication'
import Pantry from './pages/Pantry'
import RecipeSearchPage from './pages/RecipeSearchPage'
import Cookbook from './pages/Cookbook'

import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'gestalt/dist/gestalt.css';

function App() {
  // info about user and their current session
  // if exists, get user data from local storage when page first loads or refreshes
  // will either be data from last visit or null
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))

  useEffect(() => {
    // save user data to local storage
    window.localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Authentication />} />

            {/* routes only accessible if user is authenticated */}
            <Route element={<PrivateRoute/>}>
              <Route path='pantry' element={<Pantry/>}/>
              <Route path="search" element={<RecipeSearchPage />} />
              <Route path="cookbook" element={<Cookbook />} />
            </Route>

            {/* redirect invalid paths back to auth page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
