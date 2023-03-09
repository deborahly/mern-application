const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');
const bcrypt = require('bcrypt');

async function createUser(user) {
  try {
    const { firstName, lastName, email, password } = user;

    // Create hashed password with salt
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashedPassword,
    };
    return await UserRepository.userInsertOne(newUser);
  } catch (err) {
    throw err;
  }
}

async function loginUser(email, password) {
  try {
    const user = await UserRepository.userFindOne({ email });

    if (!user) {
      const err = new Error('Cannot find user.');
      err.status = 400;
      throw err;
    }

    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      return {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        accessToken: accessToken,
      };
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = { loginUser, createUser };
