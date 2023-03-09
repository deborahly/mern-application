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
      return {
        firstName: user.first_name,
        lastName: user.last_name,
      };
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
}

async function loginUserWithJWT(email, password) {
  try {
    const user = await UserRepository.userFindOne({ email });

    if (!user || user.password !== password) {
      const err = new Error('Email or password does not match.');
      err.status = 400;
      throw err;
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    return {
      first_name: user.first_name,
      last_name: user.last_name,
      token: jwtToken,
    };
  } catch (err) {
    throw err;
  }
}

module.exports = { loginUser, createUser };
