import React, { createContext } from 'react';

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

  static login = async (username, password) => {
    const res = true; // Attempt to log the user in
    if (res) {
      // Set a new authToken
      const expTime = JSON.stringify(generateExpirationTime());
      window.localStorage.setItem(TOKEN_KEY, expTime);
    } else {
      // Failed to login, credentials incorrect or something
    }
  };

  static logout = () => {
    localStorage.removeItem(TOKEN_KEY);
  };
}

const AuthContext = createContext({
  authenticated: false,
  refreshAuth: () => {},
  login: (username, password) => {}
});

export default Auth;

export { AuthContext };
