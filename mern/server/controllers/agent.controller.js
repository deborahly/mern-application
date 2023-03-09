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

async function getAgent(req, res, next) {
  try {
    const data = await AgentService.getAgent(req.params.id);
    const message = `Agent found.`;
    res.status(200).json({ type: 'success', message: message, data: data });
  } catch (err) {
    next(err);
  }
}

async function createAgent(req, res, next) {
  try {
    const agent = req.body;
    const { firstName, lastName, email, phone, rating, fee, sales, region } =
      agent;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !rating ||
      !fee ||
      !sales ||
      !region
    ) {
      const err = new Error('Missing one or more parameters.');
      err.status = 400;
      throw err;
    }
    const data = await AgentService.createAgent(agent);
    const message = 'Agent created.';
    res.status(201).json({ type: 'success', message: message, data: data });
  } catch (err) {
    next(err);
  }
}

async function updateAgent(req, res, next) {
  try {
    const id = req.params.id;
    const agent = req.body;
    const data = await AgentService.updateAgent(id, agent);
    const message = 'Agent updated.';
    res.status(200).json({ type: 'success', message: message, data: data });
  } catch (err) {
    next(err);
  }
}

async function deleteAgent(req, res, next) {
  try {
    const id = req.query.id;
    const data = await AgentService.deleteAgent(id);
    const message = 'Agent deleted.';
    res.status(200).json({ type: 'success', message: message, data: data });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAgents, getAgent, createAgent, updateAgent, deleteAgent };
