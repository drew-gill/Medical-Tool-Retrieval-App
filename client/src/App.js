import React, { useEffect, useState, useCallback } from 'react';
import Auth, { AuthContext } from './Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import ToolView from './views/ToolView/ToolView';
import AccountView from './views/AccountView/AccountView';
import NotFound from './views/NotFound';
import Login from './views/Login/Login';
import UsersView from './views/UsersView/UsersView';
import LoadingView from './components/LoadingView';

const App = () => {
  const [authenticated, setAuthenticated] = useState(Auth.isAuthenticated());
  const [isMaster, setIsMaster] = useState(undefined);

  const refreshAuth = useCallback(async () => {
    setIsMaster(undefined);
    const res1 = Auth.isAuthenticated();
    setAuthenticated(res1);
    if (res1) {
      const res2 = await Auth.isMaster();
      setIsMaster(res2);
    } else {
      setIsMaster(false);
    }
  });

  const login = useCallback(async (username, password) => {
    await Auth.login(username, password);
    await refreshAuth();
  });

  const logout = useCallback(() => {
    Auth.logout();
    refreshAuth();
  });

  const getUser = Auth.getUser;

  const updateCredentials = Auth.updateCredentials;

  useEffect(() => {
    refreshAuth();
  }, []);

  const renderAccountView = () => {
    if (isMaster === undefined) {
      return <LoadingView />;
    }
    if (authenticated) {
      return <AccountView />;
    } else {
      return <Redirect to='/' />;
    }
  };

  const renderUsersView = () => {
    if (isMaster === undefined) {
      return <LoadingView />;
    }
    if (authenticated && isMaster) {
      return <UsersView />;
    } else {
      return <Redirect to='/' />;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        refreshAuth,
        login,
        logout,
        getUser,
        updateCredentials,
        isMaster,
      }}
    >
      <div style={{ margin: '0px 20px' }}>
        <Switch>
          <Route exact path='/Home' component={Home} />
          <Route exact path='/ToolView/:id' component={ToolView} />
          <Route exact path='/Users'>
            {renderUsersView()}
          </Route>
          <Route exact path='/Account'>
            {renderAccountView()}
          </Route>
          <Route exact path='/Login'>
            {authenticated ? <Redirect to='/Home' /> : <Login />}
          </Route>
          <Route exact path='/'>
            {authenticated ? <Redirect to='/Home' /> : <Redirect to='/Login' />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
