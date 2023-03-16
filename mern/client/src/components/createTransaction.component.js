import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthHeader } from 'react-auth-kit';
import Modal from './modal/modal.component';

export default function CreateTransaction() {
  const [form, setForm] = useState({
    amount: '',
    agentId: '',
  });
  const [agents, setAgents] = useState([]);
  const [modal, setModal] = useState({ show: false });

  const navigate = useNavigate();
  const authHeader = useAuthHeader();

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

  function updateForm(value) {
    return setForm(prev => {
      return { ...prev, ...value };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    setModal(() => {
      return { show: true };
    });
  }

  async function handleConfirm() {
    const newTransaction = { ...form };

    await fetch('http://localhost:5000/transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader(),
      },
      body: JSON.stringify(newTransaction),
    }).catch(error => {
      navigate(`/error/${error}`);
      return;
    });

    setForm({
      amount: '',
      agentId: '',
    });

    navigate('/transaction');
  }

  function handleClose() {
    setModal(() => {
      return { show: false };
    });
  }

  return (
    <div>
      <h3>Create Transaction</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='text'
            className='form-control'
            id='amount'
            value={form.amount}
            onChange={e => updateForm({ amount: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <select
            className='form-control'
            aria-label='Agent select'
            onChange={e => updateForm({ agentId: e.target.value })}
          >
            <option value=''>--Choose an agent--</option>
            {agents.map(agent => (
              <option key={agent._id} value={agent._id}>
                {agent.firstName} {agent.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <input type='submit' value='Create' className='btn btn-primary' />
        </div>
        <Modal
          show={modal.show}
          text='Confirm creation?'
          handleConfirm={handleConfirm}
          handleClose={handleClose}
        />
      </form>
    </div>
  );
}
