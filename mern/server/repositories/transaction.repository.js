const dbo = require('../db/conn');
const { ObjectId } = require('mongodb');

async function transactionFind(filter = {}) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return await db_connect.collection('transactions').find(filter).toArray();
  } catch (err) {
    throw err;
  }
}

async function transactionInsertOne(transaction) {
  try {
    // Transform id string into id object
    transaction.agentId = ObjectId(transaction.agentId);

    const db_connect = dbo.getDb('admin-app');
    return await db_connect
      .collection('transactions')
      .insertOne({ ...transaction, date: new Date() });
  } catch (err) {
    throw err;
  }
}

async function transactionDeleteMany(agentId) {
  const db_connect = dbo.getDb('admin-app');
  const query = { agentId: ObjectId(agentId) };
  return await db_connect.collection('transactions').deleteMany(query);
}

module.exports = {
  transactionFind,
  transactionInsertOne,
  transactionDeleteMany,
};
