const express = require('express');
const UserController = require('../controllers/user.controller');

const userRoutes = express.Router();

userRoutes.route('/user-create').post(UserController.createUser);
userRoutes.route('/login').post(UserController.loginUser);

module.exports = userRoutes;