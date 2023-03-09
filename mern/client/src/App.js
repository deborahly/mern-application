import React from 'react';

// We use Route in order to define the different routes of our application
import { Route, Routes, onEnter } from 'react-router-dom';

// We import all the components we need in our app
import Navbar from './components/navbar.component';
import AgentList from './components/agentList.component';
import Edit from './components/edit.component';
import Create from './components/create.component';
import Login from './components/login.component';

const App = () => {
  return (
    <div>
      <Navbar />
      <div style={{ margin: 20 }}>
        <Routes>
          <Route exact path='/' element={<AgentList />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/create' element={<Create />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
