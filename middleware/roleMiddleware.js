const jwt = require("jsonwebtoken");
const Role = require("../models/auth/roles");
const Permission = require("../models/auth/Permissions");

const checkPermission = (module, action) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Assuming you have a way to find a user's roles based on their ID
      const userRoles = await User.findById(userId).populate("roles").exec();
      const roleIds = userRoles.roles.map((role) => role._id);

      // Check if any of the user's roles have the required permission
      const permission = await Permission.findOne({
        role: { $in: roleIds },
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
      res.status(401).json({ message: "Authorization failed" });
    }
  };
};

module.exports = checkPermission;
