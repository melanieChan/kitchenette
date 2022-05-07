import './App.css';
import React, { useState } from 'react';
import { UserContext } from './auth/UserContext'
import PrivateRoute from './auth/PrivateRoute'

import Authentication from './pages/Authentication'
import Pantry from './pages/Pantry'
import RecipeSearchPage from './pages/RecipeSearchPage'
import Cookbook from './pages/Cookbook'

import Navbar from './components/Navbar'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'gestalt/dist/gestalt.css';

function App() {
  // info about user and their current session
  const [userData, setUserData] = useState(null)

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

          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
