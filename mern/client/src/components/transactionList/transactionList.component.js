import { useEffect, useState } from 'react';
import { useAuthHeader, useSignOut } from 'react-auth-kit';
import { useNavigate, NavLink } from 'react-router-dom';
import Transaction from '../transaction.component';
import './transactionList.styles.css';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [agents, setAgents] = useState([]);
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    async function getTransactions() {
      const response = await fetch('http://localhost:5000/transaction-data/', {
        method: 'GET',
        headers: {
          Authorization: authHeader(),
        },
      });
      if (!response.ok) {
        if (response.status === 403) {
          signOut();
          navigate('/login');
          return;
        }
        navigate(`/error/${response.statusText}`);
        return;
      }
      const responseObj = await response.json();
      setAgents(responseObj.data.agents);
      setTransactions(responseObj.data.transactions);
    }
    getTransactions();
    return;
  }, [transactions.length]);

  function transactionList() {
    return transactions.map(transaction => {
      const agent = agents.find(agent => agent._id === transaction.agentId);
      return (
        <Transaction
          transaction={transaction}
          agent={agent}
          key={transaction._id}
        />
      );
    });
  }
  
  return (
    <div>
      <div className='transaction-list__header'>
        <h3>Transaction List</h3>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='/create-transaction'>
              Create Transaction
            </NavLink>
          </li>
        </ul>
      </div>
      <table className='table table-striped' style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Agent</th>
          </tr>
        </thead>
        <tbody>{transactionList()}</tbody>
      </table>
    </div>
  );
}
