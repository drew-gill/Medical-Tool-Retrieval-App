import React, { useEffect, useState, useCallback, createContext } from 'react';
import Auth, { AuthContext } from './Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import ToolView from './views/ToolView/ToolView';
import AccountView from './views/AccountView/AccountView';
import NotFound from './views/NotFound';
import Login from './views/Login/Login';

const App = () => {
  const [authenticated, setAuthenticated] = useState(Auth.isAuthenticated());

  const refreshAuth = useCallback(() => {
    const res = Auth.isAuthenticated();
    console.log(res);
    setAuthenticated(res);
  });

  const login = useCallback(async (username, password) => {
    await Auth.login(username, password);
    refreshAuth();
  });

  const logout = useCallback(() => {
    Auth.logout();
    refreshAuth();
  });

  const getUsername = Auth.getUsername;

  const updateCredentials = Auth.updateCredentials;

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={{
          authenticated,
          refreshAuth,
          login,
          logout,
          getUsername,
          updateCredentials
        }}
      >
        <Switch>
          <Route exact path='/Home' component={Home} />
          <Route exact path='/ToolView/:id' component={ToolView} />
          <Route exact path='/Account' component={AccountView} />
          <Route exact path='/Login' component={Login}>
            {authenticated ? <Redirect to='/Home' /> : <Login />}
          </Route>
          <Route exact path='/'>
            {authenticated ? <Redirect to='/Home' /> : <Redirect to='/Login' />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
