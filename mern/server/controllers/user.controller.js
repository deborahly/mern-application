const UserService = require('../services/user.service');

async function createUser(req, res, next) {
  try {
    const user = req.body;
    const { firstName, lastName, email, password, passwordConfirm } = user;

    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      const err = new Error(
        'First name, last name, email, password and password confirmation are required.'
      );
      err.status = 400;
      throw err;
    }

    if (password !== passwordConfirm) {
      const err = new Error("Passwords don't match.");
      err.status = 400;
      throw err;
    }

    await UserService.createUser(user);
    const message = 'User created';
    res.status(200).json({ type: 'success', message: message });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error('Email and password are required.');
      err.status = 400;
      throw err;
    }

    const data = await UserService.loginUser(email, password);
    if (data) {
      const message = 'User logged in';
      res.status(200).json({ type: 'success', message: message, data: data });
    } else {
      const message = 'Not allowed.';
      res.status(400).json({ type: 'error', message: message });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { loginUser, createUser };
