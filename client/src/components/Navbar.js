import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='nav-container'>
        <ul className='nav-items right-nav'></ul>
        <ul className='nav-items left-nav'>
          <li className='nav-item'>
            <Link to='/register'>
              <span>Sign Up</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login'>
              <span>Sign In</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/'>
              <span>Home</span>
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/dashboard'>
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
