const express = require('express');
const TransactionController = require('../controllers/transaction.controller');
const { authorization } = require('../middlewares/authorization.middleware');

const transactionRoutes = express.Router();

transactionRoutes
  .route('/transaction-data')
  .get(authorization, TransactionController.getData);
transactionRoutes
  .route('/transaction')
  .post(authorization, TransactionController.createTransaction);

module.exports = transactionRoutes;
