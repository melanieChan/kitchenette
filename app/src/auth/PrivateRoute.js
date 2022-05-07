import React, { useState, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { UserContext } from './UserContext'

// only allows authenticated users to access the route
const PrivateRoute = () => {
    const {userData} = useContext(UserContext) // get user data to determine if they're authorized

    // only show child components if user is authenticated, otherwise redirect back to login page
    return userData ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute
