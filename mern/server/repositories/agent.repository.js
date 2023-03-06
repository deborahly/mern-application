const dbo = require('../db/conn');

async function agentFind(filter = {}) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return db_connect.collection('agents').find(filter).toArray();
  } catch (err) {
    throw err;
  }
}

module.exports = { agentFind };
