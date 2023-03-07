import React, { useEffect, useState } from 'react';
import Agent from './agent.component';

export default function AgentList() {
  const [agents, setAgents] = useState([]);

  // Fetch agents from the database
  useEffect(() => {
    async function getAgents() {
      const response = await fetch(`http://localhost:5000/agents/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
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
      <h3>Agent List</h3>
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
