import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <NavLink className='navbar-brand' to='/'>
          <img
            alt='rocket-logo'
            style={{ width: 12 + '%' }}
            src={require('../images/rocketLogo.png')}
          ></img>
        </NavLink>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item'>
              <NavLink className='nav-link' to='/create'>
                Create Agent
              </NavLink>
            </li>
            {isAuthenticated() && (
              <NavLink className='nav-link' to='/logout'>
                Logout
              </NavLink>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
