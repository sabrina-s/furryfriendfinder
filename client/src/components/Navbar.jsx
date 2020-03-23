import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const meApi = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotifind-sabrina.herokuapp.com/api/users/me';
  } else {
    return 'http://localhost:5000/api/users/me';
  }
}

const logoutApi = () => {
  if (process.env.NODE_ENV === 'production') {
    return 'https://spotifind-sabrina.herokuapp.com/api/users/logout';
  } else {
    return 'http://localhost:5000/api/users/logout';
  }
}

function Navbar() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async() => {
      const response = await fetch(meApi(), {
        method: 'GET',
        credentials: 'include'
      });
      await response.json()
        .then(user => {
          setCurrentUser(user);
        })
        .catch(error => {
          console.error('Unable to fetch current user: ', error);
        })
    })();
  }, [])

  function handleLogOut() {
    return fetch(logoutApi(), {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        setCurrentUser();
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <h2>Furry Friend Finder</h2>
      </Link>
      {
        currentUser &&
        <div className='user-details'>
          <p>{currentUser.username}</p>
          <button className='logout' onClick={handleLogOut}>Log out</button>
        </div>
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
