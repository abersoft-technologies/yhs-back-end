const { User } = require('../models');
const bcrypt = require('bcryptjs');
const auth = require('../helpers/jwt');

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw Error('Invalid credentials');
    }
    const token = auth.generateAccessToken(user);
    return { token: token, user: user };
  } catch (err) {
    console.log(err.message);

    throw Error('Error while logging in');
  }
};

const signup = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  try {
    /* Check if user with inputed email exists */
    let user = await User.findOne({ email: userData.email });
    if (user) {
      throw Error('Email is already in use');
    }
    /* If email is'nt in use, create instance of user */
    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    /* After pw encrypt save instance of user */
    await user.save();

    /* User jwt helper to generate token */
    const token = auth.generateAccessToken(user);

    /* Return relevant user data and generated token */
    return { token: token, user: user };
  } catch (err) {
    console.error(err);
    throw Error('Error while signing up');
  }
};

module.exports = {
  login,
  signup,
};
