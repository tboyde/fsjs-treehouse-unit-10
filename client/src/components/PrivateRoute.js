import React from "react";
import { Navigate, useLocation } from 'react-router-dom'; 

//this function ensures that it's children elements checks to see if user is authenticated and if not redirects
const PrivateRoute = ({context, children}) => {
    const location = useLocation(); 
    const isAuth = context.authenticatedUser; 

    return isAuth ? children : <Navigate to='/signin' replace state={{from: location}} />; 
}


export default PrivateRoute; 