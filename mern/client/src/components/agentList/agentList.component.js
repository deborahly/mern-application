import React, { useEffect, useState } from 'react';
import Agent from '../agent.component';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import './agentList.styles.css';

export default function AgentList() {
  const [agents, setAgents] = useState([]);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();

  useEffect(() => {
    async function getAgents() {
      const response = await fetch('http://localhost:5000/agents/', {
        method: 'GET',
        headers: {
          Authorization: authHeader(),
        },
      });

      if (!response.ok) {
        navigate(`/error/${response.statusText}`);
        return;
      }

      const responseObj = await response.json();
      const agents = responseObj.data;
      setAgents(agents);
    }

    getAgents();

    return;
  }, [agents.length]);

  async function deleteAgent(id) {
    await fetch(`http://localhost:5000/agent-delete?id=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: authHeader(),
      },
    });
    const newAgents = agents.filter(el => el._id !== id);
    setAgents(newAgents);
  }

  function agentList() {
    return agents.map(agent => {
      return (
        <Agent
          agent={agent}
          deleteAgent={() => deleteAgent(agent._id)}
          key={agent._id}
        />
      );
    });
  }

  return (
    <div>
      <div className='header'>
        <h3>Agent List</h3>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/create'>
              Create Agent
            </NavLink>
          </li>
        </ul>
      </div>
      <table className='table table-striped' style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Fee</th>
            <th>Sales</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>{agentList()}</tbody>
      </table>
    </div>
  );
}