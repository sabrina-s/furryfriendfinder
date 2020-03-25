import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar';
import Dogs from './Dogs/Dogs';
import LoginPage from './Users/LoginPage';
import RegistrationPage from './Users/RegistrationPage';
import SettingsPage from './Users/SettingsPage';
import { UserContext } from './Users/UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState();

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Navbar setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path="/" exact component={Dogs} />
          <Route path="/login" component={() => <LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/settings" component={SettingsPage} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
