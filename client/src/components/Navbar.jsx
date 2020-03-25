import React, { useContext } from 'react';
import { UserContext } from './Users/UserContext';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { LOGOUT_API } from '../api';

function Navbar({ setCurrentUser }) {
  const history = useHistory();
  const currentUser = useContext(UserContext);

  function handleLogOut() {
    return fetch(LOGOUT_API, {
      method: 'POST',
      credentials: 'include'
    })
      .then(() => {
        setCurrentUser();
        history.push('/');
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
