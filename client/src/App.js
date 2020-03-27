import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home/Home';
import ToolView from './views/ToolView/ToolView';
import NotFound from './views/NotFound';

const App = props => {
  return (
    <div>
      <Switch>
        <Route exact path='/Home' component={Home} />
        <Route exact path='/ToolView/:id' component={ToolView} />
        <Route exact path='/'>
          <Redirect to='/Home' />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
