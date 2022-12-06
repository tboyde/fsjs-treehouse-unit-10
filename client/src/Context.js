/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from 'react';
import Cookies from 'js-cookie'; 
import Data from './Data'; 

const Context = React.createContext(); 

export class Provider extends Component {

  //Stores and handles data class, cookies, and state of provider
  constructor() {
    super();
    this.data = new Data(); 
    this.cookie = Cookies.get('authenticatedUser'); 
    this.state = {
      authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    }; 
  }

  render() {
    //passes multiple pieces of information to value object will be passed to provider
    const value = {
      authenticatedUser: this.state.authenticatedUser, 
      data: this.data, 
      actions: { // Actions object stores the sign & sign out methods
        signIn: this.signIn, 
        signOut: this.signOut 
      }
    };
    return <Context.Provider value={value}>{this.props.children} </Context.Provider>;  
  }

  signIn = async ( emailAddress, password ) => {
    const user = await this.data.getUser(emailAddress, password); 

    if (user){
      this.setState(() =>({authenticatedUser: {...user, password} }));
          //Sets cookie with authenticated user's info
      Cookies.set('authenticatedUser', JSON.stringify({...user, password}), 
      {expires: 1} //user's authentication will expire in one day
      )
    }
    return user; 
  }

  signOut = () => {
    this.setState(()=> ({authenticatedUser: null })); 
    Cookies.remove('authenticatedUser'); 
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export function withContext(Component){
  return function ContextComponent(props) {
    return (
      <Context.Consumer> 
      {(context) => <Component {...props} context={context} />} 
      </Context.Consumer>
    );
  }
}