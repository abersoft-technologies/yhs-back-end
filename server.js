const express = require("express")
const cors = require("cors")
const app = express();
const db = require("./app/models");
const dbConfig = require("./app/db.config");
const Role = db.role;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.json({message: "Hello World!"})
})

db.mongoose
    .connect(`${dbConfig.connStr}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Successfully connect to MongoDB.")
        initial();
    }).catch(err => {
        console.error("Connection error", err);
        process.exit()
    });

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
          if (!err && count === 0) {
            new Role({
              name: "user"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'user' to roles collection");
            });
            new Role({
              name: "moderator"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'moderator' to roles collection");
            });
            new Role({
              name: "admin"
            }).save(err => {
              if (err) {
                console.log("error", err);
              }
              console.log("added 'admin' to roles collection");
            });
          }
        });
    }



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: ${PORT}`)
});
