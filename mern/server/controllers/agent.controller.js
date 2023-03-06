const AgentService = require('../services/agent.service');

async function getAgents(req, res, next) {
  try {
    const data = await AgentService.getAgents();
    const message = `Retrieved ${data.length} agents.`;
    res.status(200).json({ type: 'success', message: message, data: data });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAgents };
