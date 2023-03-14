import React from 'react';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import 'bootstrap/dist/css/bootstrap.css';

import Navbar from './components/navbar.component';
import AgentList from './components/agentList/agentList.component';
import TransactionList from './components/transactionList/transactionList.component';
import Edit from './components/edit.component';
import Create from './components/create.component';
import CreateTransaction from './components/createTransaction.component';
import Login from './components/login.component';
import Logout from './components/logout.component';
import Error from './components/error.component';
import Home from './components/home/home.component';

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
                element={<PrivateRoute Component={Home} />}
              />
              <Route
                exact
                path='/agent'
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
              <Route
                path='/transaction'
                element={
                  <RequireAuth loginPath='/login'>
                    <TransactionList />
                  </RequireAuth>
                }
              />
              <Route
                path='/create-transaction'
                element={
                  <RequireAuth loginPath='/login'>
                    <CreateTransaction />
                  </RequireAuth>
                }
              />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/error/:message' element={<Error />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
