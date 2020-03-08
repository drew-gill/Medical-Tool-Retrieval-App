import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound';
import NavBar from './components/Header/NavBar';

<<<<<<< HEAD
const App = (props) => {
=======
const App = () => {
>>>>>>> fe7064f90cabf70fd6e5ac000e7db442f0a1e258
  return (
    <div>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path='/Home' component={Home} />
        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
