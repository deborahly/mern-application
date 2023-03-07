const express = require('express');
const AgentController = require('../controllers/agent.controller');

const agentRoutes = express.Router();

agentRoutes.route('/agents').get(AgentController.getAgents);
agentRoutes.route('/agent/:id').get(AgentController.getAgent);
agentRoutes.route('/agent-create').post(AgentController.createAgent);
agentRoutes.route('/agent-update/:id').post(AgentController.updateAgent);
agentRoutes.route('/agent-delete').delete(AgentController.deleteAgent);

module.exports = agentRoutes;
