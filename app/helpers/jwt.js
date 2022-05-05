require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['x-access-token'];
  //   console.log(req.headers);
  //   console.log(token);
  if (token === null) {
    return res.status(403).send({ message: 'Token not provided!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '120m',
    });
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

function generateAccessToken(email) {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '120m',
  });
}

function generateRefreshAccessToken(email) {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN, {
    expiresIn: '120m',
  });
}

function verifyRefresh(email, token) {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN);
    return decoded.email === email;
  } catch (error) {
    console.error(error);
    return false;
  }
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshAccessToken,
  verifyRefresh,
};
