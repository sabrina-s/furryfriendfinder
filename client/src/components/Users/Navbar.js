import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginPage from './LoginPage';

function Navbar() {
  return (
    <div className="navbar">
      <h2>Furry Friend Finder</h2>
      <Router>
        <Link to="/login">Login</Link>

        <Switch>
          <Route path="/login">
            <LoginPage/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
};

export default Navbar;
