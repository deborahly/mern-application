const AgentRepository = require('../repositories/agent.repository');

async function getAgents() {
  try {
    const dbResult = await AgentRepository.agentFind();
    return dbResult;
  } catch (err) {
    throw err;
  }
}

module.exports = { getAgents };
