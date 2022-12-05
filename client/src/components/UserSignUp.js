import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserSignUp = ({ context }) => {

  const [ valErrors, setErrors ] = useState(); 
  const redirectTo = useNavigate(); 

  //references to fields for user signup 
  const firstName = useRef(); 
  const lastName = useRef(); 
  const emailAddress = useRef(); 
  const password = useRef();
  
  const submitHandler = (e) =>{
    e.preventDefault(); 

    //creates user object from input from the user 
    const user = {
      "firstName": firstName.current.value, 
      "lastName": lastName.current.value, 
      "emailAddress": emailAddress.current.value, 
      "password": password.current.value, 
    }

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors){
          setErrors(errors); 
        } else {
          context.actions
          .signIn(emailAddress.current.value, password.current.value )
          .then(() => redirectTo('/'))
          .catch(err =>{
            console.log('Sign In Error: ', err); 
            redirectTo('/error'); 
          })
        }
      })
      .catch(err =>{
        console.log('Error creating new user', err); 
        redirectTo('/error'); 
      })
    }; 

  const cancelHandler = (e) => {
    e.preventDefault(); 
    redirectTo('/')
  }
       return (
        <>
        <main>
          <div className="form--centered">
            <h2>Sign Up</h2>
            {valErrors ? (
              <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {valErrors.map((error, index) => <li key={index}>{error}</li>)}
                        </ul>
              </div>
              ): null }

            <form onSubmit={submitHandler}>
              <label htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" defaultValue="" ref={firstName} />
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" defaultValue="" ref={lastName} />
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                defaultValue=""
                ref={emailAddress}
              />
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" defaultValue="" ref={password} />
              <button className="button" type="submit">
                Sign Up
              </button>
              <button
                className="button button-secondary"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </form>
            <p>
              Already have a user account? Click here to{" "}
              <Link to="/signup">sign in</Link>!
            </p>
          </div>
        </main>
      </>      
       )
   }

export default UserSignUp;

