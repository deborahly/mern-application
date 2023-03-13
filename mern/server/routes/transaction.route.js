const express = require('express');
const TransactionController = require('../controllers/transaction.controller');

const transactionRoutes = express.Router();

transactionRoutes.route('/transaction-data').get(TransactionController.getData);
transactionRoutes
  .route('/transaction')
  .post(TransactionController.createTransaction);

module.exports = transactionRoutes;
