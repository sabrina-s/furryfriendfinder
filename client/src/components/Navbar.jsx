import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ME_API, LOGOUT_API } from '../api';

function Navbar() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    (async() => {
      const response = await fetch(ME_API, {
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
    return fetch(LOGOUT_API, {
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

  function viewUserSettings() {
    history.push('/settings');
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <h2>Furry Friend Finder</h2>
      </Link>
      {
        currentUser &&
        <div className='user-details'>
          <p onClick={viewUserSettings}>{currentUser.username}</p>
          <button className='logout' onClick={handleLogOut}>Log out</button>
        </div>
      }
      {
        !currentUser &&
        <div>
          <Link to='/login'>Login</Link>
          /
          <Link to='/register'>Register</Link>
        </div>
      }
    </div>
  )
};

export default Navbar;
