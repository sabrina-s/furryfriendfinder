import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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

function Navbar() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async() => {
      const response = await fetch(meApi(), options);
      await response.json()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(error => {
          console.error('Unable to fetch current user: ', error);
        })
    })();
  }, [])

  return (
    <div className='navbar'>
      <Link to='/'>
        <h2>Furry Friend Finder</h2>
      </Link>
      {
        currentUser &&
        <p>
          {currentUser.username}
        </p>
      }
      {
        !currentUser &&
        <Link to='/login'>
          Login
        </Link>
      }
    </div>
  )
};

export default Navbar;
