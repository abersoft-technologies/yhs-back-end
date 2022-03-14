const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const auth = require("./app/helpers/jwt");
const unless = require("express-unless");
const users = require("./app/controllers/UserController");
const errors = require("./app/helpers/errorHandler");
const dbConfig = require("./app/db.config");
const cookieSession = require("cookie-session");
const jwt = require("jsonwebtoken");

let tokens = [];

app.use(cors());

auth.authenticateToken.unless = unless;
app.use(auth.authenticateToken.unless({
  path: [
    {url: '/users/login', methods: ["POST"]},
    {url: '/users/signup', methods: ["POST"]},
  ]
}))


mongoose.connect(dbConfig.connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', () => console.error.bind(console, 'connection error:'))
db.once('open', () => console.log(`Connected to mongo at ${dbConfig.connStr}`))


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", users)
app.use(errors.errorHandler);

app.get("/", (req, res) => {
  res.send({message: "Hello!"})
})

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if(refreshToken === null) return res.status(401);
  if(!tokens.includes(refreshToken)) return res.status(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    if(err) return res.status(403);
    const accessToken = auth.generateAccessToken({ name: user.username });
    res.json(accessToken);
  })
})

const PORT = process.env.PORT || 8080;
app.listen(80, () => {
  console.log('Enable on port 80')

})
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
});
