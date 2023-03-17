const AgentRepository = require('../repositories/agent.repository');
module.exports = { getAgents, getAgent, createAgent, updateAgent, deleteAgent };
const deleteTransactions =
  require('../services/transaction.service').deleteTransactions;

async function getAgents() {
  try {
    const dbResult = await AgentRepository.agentFind();
    return dbResult;
  } catch (err) {
    throw err;
  }
}

async function getAgent(id) {
  try {
    const dbResult = await AgentRepository.agentFindOne(id);
    if (dbResult == null) {
      const err = new Error('Agent not found.');
      err.status = 404;
      throw err;
    }
    return dbResult;
  } catch (err) {
    throw err;
  }
}

async function createAgent(agent) {
  try {
    const dbResult = await AgentRepository.agentInsertOne(agent);
    return dbResult;
  } catch (err) {
    throw err;
  }
}

async function updateAgent(id, agent) {
  try {
    const dbResult = await AgentRepository.agentUpdate(id, agent);
    return dbResult;
  } catch (err) {
    throw err;
  }
}

async function deleteAgent(id) {
  try {
    // Delete agent's transactions
    await deleteTransactions(id);

    // Delete agent
    const dbResult = await AgentRepository.agentDelete(id);
    return dbResult;
  } catch (err) {
    throw err;
  }
}
