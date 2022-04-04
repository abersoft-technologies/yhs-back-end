require('dotenv').config();
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (token === null) {
    return res.status(403).send({ message: 'Token not provided!' });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
}

function generateAccessToken(email) {
  return jwt.sign({ user: { email } }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshAccessToken(email) {
  return jwt.sign({ user: { email } }, process.env.REFRESH_TOKEN);
}

module.exports = {
  authenticateToken,
  generateAccessToken,
  generateRefreshAccessToken,
};
