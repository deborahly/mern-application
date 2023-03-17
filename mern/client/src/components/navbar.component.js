import React from 'react';
import { NavLink } from 'react-router-dom';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';

export default function Navbar() {
  const isAuthenticated = useIsAuthenticated();
  const auth = useAuthUser();

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
          {isAuthenticated() && (
            <div>
              <p className='my-0'>Welcome back, {auth().firstName}!</p>
              <ul className='navbar-nav ml-auto justify-content-end'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to='/logout'>
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
