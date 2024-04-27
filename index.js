require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { app, server, socketManager } = require("./socket/socketio");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const authenticateToken = require("./middleware/authMiddleware");

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Include routes
app.use("/api/user", authenticateToken, userRoutes);
app.use("/api/auth", authRoutes);

// socketio initialization and connection check
const onConnection = (socket) => {
  connection(socketManager.io, socket);
};

// Apply middleware to the io instance
// socketManager.use(socketAuth);
// socketManager.applyMiddleware();

socketManager.io.on("connection", onConnection);

// Start the server
server.listen(process.env.APP_PORT, () => {
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
