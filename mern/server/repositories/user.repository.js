const dbo = require('../db/conn');

async function userInsertOne(user) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return await db_connect.collection('users').insertOne(user);
  } catch (err) {
    throw err;
  }
}

async function userFindOne(query) {
  try {
    const db_connect = dbo.getDb('admin-app');
    return await db_connect.collection('users').findOne(query);
  } catch (err) {
    throw err;
  }
}

module.exports = { userFindOne, userInsertOne };
