const TransactionService = require('../services/transaction.service');

async function getData(req, res, next) {
  try {
    const data = await TransactionService.getData();
    res.status(200).json({ type: 'success', data: data });
  } catch (err) {
    next(err);
  }
}

async function createTransaction(req, res, next) {
  try {
    const transaction = req.body;
    const { agentId, amount } = transaction;
    if (!agentId || !amount) {
      const err = new Error('Missing one or more parameters.');
      err.status = 400;
      throw err;
    }
    const data = await TransactionService.createTransaction(transaction);
    res.status(201).json({ type: 'success', data: data });
  } catch (err) {
    next(err);
  }
}

module.exports = { getData, createTransaction };
