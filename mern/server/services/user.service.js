const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repository');

async function createUser(user) {
  try {
    const { firstName, lastName, email, hashedPassword = password } = user;

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

    if (user.password == password) {
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
