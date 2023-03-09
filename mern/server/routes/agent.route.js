const express = require('express');
const AgentController = require('../controllers/agent.controller');
const {
  authorization
} = require('../middlewares/authorization.middleware');

const agentRoutes = express.Router();

agentRoutes.route('/agents').get(authorization, AgentController.getAgents);
agentRoutes.route('/agent/:id').get(authorization, AgentController.getAgent);
agentRoutes
  .route('/agent-create')
  .post(authorization, AgentController.createAgent);
agentRoutes
  .route('/agent-update/:id')
  .post(authorization, AgentController.updateAgent);
agentRoutes
  .route('/agent-delete')
  .delete(authorization, AgentController.deleteAgent);

module.exports = agentRoutes;
