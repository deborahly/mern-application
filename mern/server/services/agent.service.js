const AgentRepository = require('../repositories/agent.repository');

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
    const dbResult = await AgentRepository.agentDelete(id);
    return dbResult;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAgents, getAgent, createAgent, updateAgent, deleteAgent };
