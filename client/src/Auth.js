import React, { createContext } from 'react';
import { VerifyLogin } from './apiCalls'

// Settings
const TOKEN_KEY = 'authToken';
const EXPIRATION_TIME = 24; // How long a user can remain logged-in for, in hours.
const EXP_TIME = EXPIRATION_TIME * 60 * 60 * 1000; // EXPIRATION_TIME in milliseconds.

const generateExpirationTime = () => new Date().getTime() + EXP_TIME;

// This class will handle user authentication, allowing a user to remain logged in.
class Auth {
  static isAuthenticated = () => {
    const authToken = JSON.parse(window.localStorage.getItem(TOKEN_KEY));
    return new Date().getTime() < authToken;
  };

  static getUsername = () => JSON.parse(localStorage.getItem('username'));
  
  static login = async (username, password) => {
    const res = await VerifyLogin(username, password); // Attempt to log the user in
    if (res) {
      // Set a new authToken
      const expTime = JSON.stringify(generateExpirationTime());
      localStorage.setItem(TOKEN_KEY, expTime);
      localStorage.setItem('username', JSON.stringify(username));
    } else {
      // Failed to login, credentials incorrect or something
      console.log("Failed to login!!!")
    }
  };

  static logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem(TOKEN_KEY);
  };

  static updateCredentials = async (username, password) => {
    // Update the credentials in mongodb
    // Update the username locally
    localStorage.setItem('username', JSON.stringify(username));
  };
}

const AuthContext = createContext({
  authenticated: false,
  refreshAuth: () => {},
  login: (username, password) => {},
  logout: () => {},
  getUsername: () => {},
  updateCredentials: (username, password) => {}
});

export default Auth;

export { AuthContext };
