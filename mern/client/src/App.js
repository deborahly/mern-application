import React from 'react';

// We use Route in order to define the different routes of our application
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar.component';
import AgentList from './components/agentList.component';
import Edit from './components/edit.component';
import Create from './components/create.component';
import Login from './components/login.component';
import { AuthProvider, RequireAuth, useIsAuthenticated } from 'react-auth-kit';

const App = () => {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to='/login' />;
  };

  return (
    <AuthProvider
      authType={'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https:'}
    >
      <BrowserRouter>
        <div>
          <Navbar />
          <div style={{ margin: 20 }}>
            <Routes>
              <Route
                exact
                path='/'
                element={<PrivateRoute Component={AgentList} />}
              />
              <Route
                path='/edit/:id'
                element={
                  <RequireAuth loginPath='/login'>
                    <Edit />
                  </RequireAuth>
                }
              />
              <Route
                path='/create'
                element={
                  <RequireAuth loginPath='/login'>
                    <Create />
                  </RequireAuth>
                }
              />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
