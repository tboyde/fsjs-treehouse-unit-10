import React from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom'; 

//this function checks to see if user is authenticated before private routes are accessed. Otherwise, it redirects the user to the signin page. 
const PrivateRoutes = ({ context }) => {
    const location = useLocation(); 
    const isAuth = context.authenticatedUser; 

    return isAuth ? <Outlet /> : <Navigate to='/signin' replace state={{from: location}} />; 
}


export default PrivateRoutes; 