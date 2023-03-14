import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>
            <img
              alt='rocket-logo'
              style={{ width: 12 + 'rem' }}
              src={require('../images/rocketLogo.png')}
            ></img>
          </NavLink>
          <ul className='navbar-nav ml-auto'>
            {isAuthenticated() && (
               <li className='nav-item'>
                <NavLink className='nav-link' to='/logout'>
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
