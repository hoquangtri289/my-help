import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

import Customers from './components/Customers';



function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/customers">CusTomers</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/customers">
            <Customers />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
