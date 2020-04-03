import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import ToolData, { ToolDataContext } from './components/ToolDataContext';
import './index.css';

ReactDOM.render(
  <ToolDataContext.Provider value={new ToolData()}>
    <Router>
      <App />
    </Router>
  </ToolDataContext.Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
