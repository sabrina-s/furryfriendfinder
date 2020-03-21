import React, { useEffect } from 'react';
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
  useEffect(() => {
    (async() => {
      // TODO
      const result = await fetch(meApi(), options);
      console.log('yeeeee----------', result)
    })();
  }, [])

  return (
    <Router>
      <div>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Dogs} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
