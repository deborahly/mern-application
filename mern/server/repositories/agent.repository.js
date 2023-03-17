const dbo = require('../db/conn');
const ObjectId = require('mongodb').ObjectId;

async function agentFind(filter = {}) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return await db_connect.collection('agents').find(filter).toArray();
  } catch (err) {
    throw err;
  }
}

async function agentFindOne(id) {
  try {
    const db_connect = dbo.getDb('admin-app');
    const query = { _id: ObjectId(id) };
    return await db_connect.collection('agents').findOne(query);
  } catch (err) {
    throw err;
  }
}

async function agentInsertOne(agent) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return await db_connect.collection('agents').insertOne(agent);
  } catch (err) {
    throw err;
  }
}

async function agentUpdate(id, agent) {
  try {
    const db_connect = dbo.getDb('admin-app');
    const query = { _id: ObjectId(id) };
    return await db_connect
      .collection('agents')
      .findOneAndUpdate(query, { $set: agent }, { upsert: true });
  } catch (err) {
    throw err;
  }
}

async function agentDelete(id) {
  const db_connect = dbo.getDb('admin-app');
  const query = { _id: ObjectId(id) };
  return await db_connect.collection('agents').deleteOne(query);
}

module.exports = {
  agentFind,
  agentFindOne,
  agentInsertOne,
  agentUpdate,
  agentDelete,
};
