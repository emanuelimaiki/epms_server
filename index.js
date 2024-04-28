require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { app, server, socketManager } = require("./socket/socketio");

const apiRoutes = require("./routes/apiRoutes");
const { HTTPlogger, logger } = require("./logger");

app.use(HTTPlogger);
// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the API routes
app.use("/api", apiRoutes);

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

      logger.info(`Connected to MongoDB on host: ${host}, database: ${dbName}`);
    })
    .catch((err) => logger.error(err));

  // end mongoose connection
  logger.info(`listening on *:${process.env.APP_PORT}`);
});
