const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import routers
app.use(require('./routes/agent.route'));

module.exports = app;
