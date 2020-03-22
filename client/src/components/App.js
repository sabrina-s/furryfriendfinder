import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Users/Navbar';
import Dogs from './Dogs/Dogs';
import LoginPage from './Users/LoginPage';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

const meApi = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotifind-sabrina.herokuapp.com/api/users/me';
  } else {
    return 'http://localhost:5000/api/users/me';
  }
}

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}

function App() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async() => {
      const response = await fetch(meApi(), options);
      const user = await response.json();
      setCurrentUser(user);
    })();
  }, [])

  return (
    <Router>
      <div>
        <Navbar currentUser={currentUser} />
        <Switch>
          <Route path='/' exact component={Dogs} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
