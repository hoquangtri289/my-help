import React from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink, Link } from 'react-router-dom'

import Customers from './components/Customers';



function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">CusTomers</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/">
            <Customers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
