import React from "react";
import { NavLink } from 'react-router-dom'; 

const Header = ({context} ) => {   
    //this is the value that is used later in the return statement to check to see if a user is authorized. If they are not, they will see a different header than a user that is authenticated & signed in. 
    const authUser = context.authenticatedUser; 

    return(
        <>
        <header>
            <div className="wrap header--flex">
                    <h1 className="header--logo">
                    <NavLink to='/'>Courses</NavLink>
                    </h1>
                    <nav>
                    { authUser ? ( //if user is authorized, then a header with a signout option will appear
                        <>
                        <ul className="header--signedin">
                            <li>{`Welcome, ${authUser.firstName} ${authUser.lastName}!`}</li>
                            <li>
                                <NavLink className='signout' to='/signout' onClick={()=> context.actions.signOut()}>Sign Out</NavLink>
                            </li>
                        </ul>
                        </>
                    ) : ( //otherwise, the signed out header will appear
                        <>
                        <ul className="header--signedout">
                            <li>
                                <NavLink className='signup' to='/signup'> Sign Up</NavLink>
                            </li>
                            <li>
                                <NavLink className='signin' to='/signin'>Sign In</NavLink>
                            </li>
                        </ul>
                        </>
                    )
                    }
                    </nav>
            </div>
        </header>
        </>
    )
}; 

export default Header; 