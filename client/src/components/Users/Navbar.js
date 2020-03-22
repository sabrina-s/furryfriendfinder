import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser }) {
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
