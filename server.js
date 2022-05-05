const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const auth = require('./app/helpers/jwt');
const unless = require('express-unless');
const errors = require('./app/helpers/errorHandler');
const dbConfig = require('./app/db.config');
const cookieSession = require('cookie-session');
const jwt = require('jsonwebtoken');
const routes = require('./app/routes');

let tokens = [];

app.use(cors());

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: '/auth/login', methods: ['POST'] },
      { url: '/auth/signup', methods: ['POST'] },
      { url: '/org/add', methods: ['POST'] },
      { url: '/refresh', methods: ['POST'] },
    ],
  })
);

mongoose.connect(dbConfig.connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'connection error:'));
db.once('open', () => console.log(`Connected to mongo at ${dbConfig.connStr}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);
app.use(errors.errorHandler);

app.post('/refresh', (req, res) => {
  const { email, refreshToken } = req.body;

  const isValid = auth.verifyRefresh(email, refreshToken);

  if (!isValid) {
    return res
      .status(401)
      .json({ success: false, error: 'Invalid token, try login again' });
  }
  const accessToken = auth.generateAccessToken(email);

  return res.status(200).json({ success: true, accessToken });
});
app.post('/token', (req, res) => {
  return res.status(200).json({ success: true, message: 'Token is valid' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
