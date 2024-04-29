const jwt = require("jsonwebtoken");
const User = require("../models/auth/User"); // Make sure to require the User model
const Permission = require("../models/auth/Permissions");

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded._id;
      // Find the user by ID to get their single role
      const user = await User.findById(userId).populate("role").exec();
      if (!user || !user.role) {
        return res.status(403).json({
          message: "Access denied: No role found for this user.",
        });
      }

      // Check if the user's role has the required permission
      const permission = await Permission.findOne({
        role: user.role._id,
        module: module,
        [action]: true,
      });

      if (!permission) {
        return res.status(403).json({
          message: "Access denied: You do not have the required permission.",
        });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Authorization failed" });
    }
  };
};

module.exports = checkPermission;
