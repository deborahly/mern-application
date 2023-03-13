const TransactionRepository = require('../repositories/transaction.repository');
const AgentService = require('../services/agent.service');

async function getData() {
  try {
    const dbResult = await TransactionRepository.transactionFind();
    const last10 = dbResult.filter((value, index) => index < 10);
    const agents = await AgentService.getAgents();
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

module.exports = { getData, createTransaction };
