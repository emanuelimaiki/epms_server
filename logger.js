require("dotenv").config();
const morgan = require("morgan");
const winston = require("winston");

require("winston-mongodb");

// Define custom levels
const customLevels = {
  levels: {
    error: 0, //operations  error
    warn: 1, //
    info: 2, // operations success
    http: 3, //http requests
    debug: 4, //server errors
    warning: 5, //client error
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta", // Color for HTTP log entries
    debug: "blue",
    warning: "cyan",
  },
};

winston.addColors(customLevels.colors);

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [
    // new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    // new winston.transports.File({ filename: "logs/combined.log" }),
    // MongoDB transport
    new winston.transports.MongoDB({
      db: process.env.MONGO_URI, // Adjust this to your MongoDB connection string
      options: { useUnifiedTopology: true },
      collection: "logs",
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

// If not in production, also log to the console
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "warning",
      format: winston.format.combine(
        // winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

// morgan http logger
function determineLogLevel(res) {
  const statusCode = res.statusCode;
  if (statusCode >= 500) {
    return "debug";
  } else if (statusCode >= 400) {
    return "warning";
  } else if (statusCode >= 100) {
    // Informational responses and Success
    return "http";
  }
  return "info"; // Default to info if something unusual happens
}
const HTTPlogger = morgan(
  (tokens, req, res) => {
    // Determine the log level based on the response status code
    const level = determineLogLevel(res);
    // Build the log message
    const message = [
      tokens.date(req, res, "clf"),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");

    // Return the message with the level at the start or end
    return `${level.toUpperCase()}: ${message}`;
  },
  {
    stream: {
      write: (message) => {
        const level = message.split(":")[0].toLowerCase(); // Extract the level from the message
        // Log based on the extracted level
        if (level === "debug") {
          logger.debug(message);
        } else if (level === "warning") {
          logger.warning(message);
        } else {
          logger.http(message);
        }
      },
    },
  }
);

module.exports = module.exports = {
  logger,
  HTTPlogger,
};
