import React, { useRef, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const UserSignIn = ({ context }) => {
  const [ valError, setValErrors ] = useState(); 

  const emailAddress = useRef();
  const password = useRef(); 

  const redirectTo = useNavigate(); 
  const location = useLocation(); 

  const submitHandler =  (e) => {
    e.preventDefault();
    
    //retrieves signin credentials from user input 
    const email = emailAddress.current.value; 
    const pass = password.current.value; 

    const lastLocation = location.state?.from || '/' //this value holds the value of the last visited location in the browser or defaults back to the index page 

    if (email && pass){
    //sign in method checks to see if user is authorized
     context.actions
      .signIn(email, pass)
      .then(currentUser => (currentUser ? redirectTo(lastLocation) : setValErrors(['Incorrect Email Address or Password. Please Try Again'])))
      .catch(err => {
        console.log('Sign In Error: ', err)
        redirectTo('/error'); 
      }); 
      } else {
        setValErrors(['Email Address and Password is Required']) 
      }
    }

  const cancelHandler = (e) => {
    e.preventDefault(); 
    redirectTo('/')
    }

       return (
        <>
        <main>
          <div className='form--centered'>
            <h2>Sign In</h2>
            { valError ? (
              <div className='validation--errors'>
                        <h3>Validation Errors</h3>
                        <ul>
                            {valError.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
                    </div> 
                    ) : null 
                  }
            <form onSubmit={submitHandler}>
              <label htmlFor='emailAddress'>Email Address</label>
              <input
                id='emailAddress'
                name='emailAddress'
                type='email'
                placeholder='example@website.com'
                ref={emailAddress}
              />
              <label htmlFor='password'>Password</label>
              <input 
              id='password' 
              name='password' 
              type='password' 
              defaultValue='' 
              ref={password}
              />
              <button className='button' type='submit'>
                Sign In
              </button>
              <button
                className='button button-secondary'
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </form>
            <p>
              Don't have a user account? Click here to{' '}
              <Link to='/signup'>sign up</Link>!
            </p>
          </div>
        </main>
      </>
      )
   }


export default UserSignIn;

