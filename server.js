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


app.use(
  cookieSession({
    name: "YH-searcher",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/users", users, cors())
app.use(errors.errorHandler);

app.use("/", (res, req) => res.send({message: "Connected"}) )

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
});
