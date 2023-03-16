const TransactionRepository = require('../repositories/transaction.repository');
module.exports = { getData, createTransaction, deleteTransactions };
const getAgents = require('../services/agent.service').getAgents;

async function getData() {
  try {
    const dbResult = await TransactionRepository.transactionFind();
    const last10 = dbResult
      .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
      .filter((value, index) => index < 10);
    const agents = await getAgents();
    const data = { transactions: last10, agents };
    return data;
  } catch (err) {
    throw err;
  }
}

async function createTransaction(transaction) {
  try {
    const dbResult = await TransactionRepository.transactionInsertOne(
      transaction
    );
    return dbResult;
  } catch (err) {
    throw err;
  }
}

async function deleteTransactions(agentId) {
  try {
    const dbResult = await TransactionRepository.transactionDeleteMany(agentId);
    return dbResult;
  } catch (err) {
    throw err;
  }
}
