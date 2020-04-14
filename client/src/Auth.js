import { createContext } from 'react';
import {
  verifyLogin,
  updateUser,
  getUser,
  getAllUsers,
  createUser,
  deleteUser,
} from './apiCalls';

// Settings
const TOKEN_KEY = 'authToken';
const EXPIRATION_TIME = 24; // How long a user can remain logged-in for, in hours.
const EXP_TIME = EXPIRATION_TIME * 60 * 60 * 1000; // EXPIRATION_TIME in milliseconds.
const USER_ID_KEY = 'userId';

const generateExpirationTime = () => new Date().getTime() + EXP_TIME;

// This class will handle user authentication, allowing a user to remain logged in.
class Auth {
  static isAuthenticated = () => {
    const authToken = JSON.parse(window.localStorage.getItem(TOKEN_KEY));
    return new Date().getTime() < authToken;
  };

  static isMaster = async () => {
    const user = await this.getUser();
    return user.master;
  };

  static getUserId = () => JSON.parse(localStorage.getItem(USER_ID_KEY));

  static getUser = async (id = undefined) => {
    try {
      if (id) {
        const user = await getUser(id);
        return user;
      } else {
        const user = await getUser(
          JSON.parse(localStorage.getItem(USER_ID_KEY))
        );
        return user;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static login = async (username, password) => {
    try {
      const user = await verifyLogin(username, password);
      // Set a new authToken
      const expTime = JSON.stringify(generateExpirationTime());
      localStorage.setItem(TOKEN_KEY, expTime);
      localStorage.setItem(USER_ID_KEY, JSON.stringify(user._id));
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static logout = () => {
    localStorage.removeItem(USER_ID_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  static updateCredentials = async (
    username = undefined,
    password = undefined
  ) => {
    try {
      await updateUser(this.getUserId(), username, password);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getUsers = async () => {
    const users = await getAllUsers();
    const pUsers = [];
    users.forEach((u) => {
      if (u._id !== this.getUserId()) {
        pUsers.push(u);
      }
    });
    return pUsers;
  };

  static createUser = async (username, password) => {
    try {
      const newUser = await createUser(username, password);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static deleteUser = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

const AuthContext = createContext({
  isMaster: false,
  authenticated: false,
  refreshAuth: () => {},
  login: (username, password) => {},
  logout: () => {},
  getUser: (id = undefined) => {},
  updateCredentials: async (username = undefined, password = undefined) => {},
});

export default Auth;

export { AuthContext };
