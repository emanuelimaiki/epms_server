const jwt = require("jsonwebtoken");
const User = require("../models/auth/User");

/**
 * Middleware to authenticate a token and attach user to the request object
 */
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // No token provided
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.sendStatus(404).json({ message: "invalid email/password" }); // No user found
    }
    req.user = user;
    next();
  } catch (err) {
    return res.sendStatus(403); // Invalid token
  }
};

module.exports = authenticateToken;
