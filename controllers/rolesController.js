const Role = require("../models/auth/roles");
const { logger } = require("../logger");
const User = require("../models/auth/User");

exports.createRole = async (req, res) => {
  try {
    const newRole = new Role({
      name: req.body.name,
    });
    const savedRole = await newRole.save();
    logger.info({
      action: "Create Role",
      performedBy: req.user.id,
      onRecord: savedRole._id,
    });
    res.status(201).json(savedRole);
  } catch (error) {
    logger.error({
      action: "Create Role",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    logger.info({
      action: "Fetch All Roles",
      performedBy: req.user.id,
    });
    res.json(roles);
  } catch (error) {
    logger.error({
      action: "Fetch All Roles",
      performedBy: req.user.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.getRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    logger.info({
      action: "Fetch Role",
      performedBy: req.user.id,
      onRecord: role._id,
    });
    res.json(role);
  } catch (error) {
    logger.error({
      action: "Fetch Role",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) return res.status(404).json({ message: "Role not found" });
    logger.info({
      action: "Update Role",
      performedBy: req.user.id,
      onRecord: role._id,
    });
    res.json(role);
  } catch (error) {
    logger.error({
      action: "Update Role",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });

    // Check if any user is associated with the role
    const usersWithRole = await User.find({ role: req.params.id });
    if (usersWithRole.length > 0) {
      // Prevent deletion if there are associated users
      return res.status(400).json({
        message:
          "Cannot delete role because it is currently assigned to one or more users.",
      });
    }

    logger.info({
      action: "Delete Role",
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    logger.error({
      action: "Delete Role",
      performedBy: req.user.id,
      onRecord: req.params.id,
      error: error.message,
    });
    res.status(500).json({ message: error.message });
  }
};
