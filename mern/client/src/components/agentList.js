import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Agent = props => (
  <tr>
    <td>{props.agent.firstName}</td>
    <td>{props.agent.lastName}</td>
    <td>{props.agent.email}</td>
    <td>{props.agent.rating}</td>
    <td>{props.agent.fee}</td>
    <td>{props.agent.sales}</td>
    <td>{props.agent.region}</td>
    <td>
      <Link className='btn btn-link' to={`/edit/${props.agent._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className='btn btn-link'
        onClick={() => {
          props.deleteAgent(props.agent._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function AgentList() {
  const [agents, setAgents] = useState([]);

  // This method fetches the agents from the database.
  useEffect(() => {
    async function getAgents() {
      const response = await fetch(`http://localhost:5000/agents/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const agents = await response.json();
      setAgents(agents);
    }

    getAgents();

    return;
  }, [agents.length]);

  // This method will delete a agent
  async function deleteAgent(id) {
    await fetch(`http://localhost:5000/agent-delete?id=${id}`, {
      method: 'DELETE',
    });

    const newAgents = agents.filter(el => el._id !== id);
    setAgents(newAgents);
  }

  // This method will map out the agents on the table
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

  // This following section will display the table with the agents of individuals.
  return (
    <div>
      <h3>Agent List</h3>
      <table className='table table-striped' style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
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
