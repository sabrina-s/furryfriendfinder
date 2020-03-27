import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navbar from './Navbar';
import Dogs from './Dogs/Dogs';
import LoginPage from './Users/LoginPage';
import RegistrationPage from './Users/RegistrationPage';
import SettingsPage from './Users/SettingsPage';
import { UserContext } from './Users/UserContext';
import { ME_API } from '../api';

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(ME_API, {
        method: 'GET',
        credentials: 'include'
      });

      await response.json()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <UserContext.Provider value={currentUser}>
      <Router>
        <Navbar setCurrentUser={setCurrentUser} />
        <Switch>
          <Route path='/' exact component={Dogs} />
          <Route path='/login' component={() => <LoginPage setCurrentUser={setCurrentUser} />} />
          <Route path='/register' component={RegistrationPage} />
          { currentUser && (
            <Route path='/settings' component={SettingsPage} />
          )}
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
