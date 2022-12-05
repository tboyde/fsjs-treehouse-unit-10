import React from "react";
import { NavLink } from 'react-router-dom'; 

const Header = ({ context }) => {   
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
                            <li>{`Welcome, ${authUser.firstName}!`}</li>
                            <li>
                                <NavLink className='signout' to='/signout' onClick={()=> context.actions.signOut()}>Sign Out</NavLink>
                            </li>
                        </ul>
                        </>
                    ) : (
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