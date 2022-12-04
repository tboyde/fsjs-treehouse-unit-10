import React, {useContext} from "react";
import { Link } from 'react-router-dom'; 
import { Context } from '../Context'

export default function Header (){
    const { user, actions } = useContext(Context)

    return(
        <>
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo">
                <a href="index.html">Courses</a>
                </h1>
                <nav>
                { user ? (
                    <>
                    <ul className="header--signedin">
                        <li>{`Welcome, ${user.firstName} ${user.lastName}!`}</li>
                        <li>
                            <Link className='signout' to='/signout' onClick={()=> actions.signOut()}>Sign Out</Link>
                        </li>
                    </ul>
                    </>
                ) : (
                    <>
                    <ul className="header--signedout">
                        <li>
                            <Link className='signup' to='/signup' onClick={()=> actions.signUp()} >Sign Up</Link>
                        </li>
                        <li>
                        <Link className='signin' to='/signin' nClick={()=> actions.signIn()}>Sign In</Link>
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