const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { auth } = require("express-openid-connect");
const auth_config = require("./config/auth");

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//authentication auth0
app.use(auth(auth_config.auth0));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Include user registration routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(process.env.APP_PORT, () => {
  // mongoose connection
  mongoose
    .connect(
      process.env.MONGO_URI || //use this if using mongodb remote
        `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@127.0.0.1:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=Admin`
    )
    .then((conn) => {
      // Access the host and database name from the connection object
      const host = conn.connections[0].host;
      const dbName = conn.connections[0].name;

      console.log(`Connected to MongoDB on host: ${host}, database: ${dbName}`);
    })
    .catch((err) => console.log(err));
  // end mongoose connection
  console.log(`listening on *:${process.env.APP_PORT}`);
});
