const Permission = require("../models/auth/Permissions");
const { logger } = require("../logger");

exports.createPermission = async (req, res) => {
  try {
    const permission = new Permission({
      role: req.body.role,
      module: req.body.module,
      read: req.body.read,
      write: req.body.write,
      update: req.body.update,
      delete: req.body.delete,
    });
    const savedPermission = await permission.save();
    logger.info({
      action: "Create Permission",
      details: `Permission created for role ${savedPermission.role} on module ${savedPermission.module}`,
      performedBy: req.user.id, // Assuming user information is available
      onRecord: savedPermission._id,
    });
    res.status(201).json(savedPermission);
  } catch (error) {
    logger.error({
      action: "Create Permission",
      error: error.message,
      data: req.body,
      performedBy: req.user.id,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    logger.info({
      action: "Fetch Permissions",
      performedBy: req.user.id,
    });
    res.json(permissions);
  } catch (error) {
    logger.error({
      action: "Fetch Permissions",
      error: error.message,
      performedBy: req.user.id,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.getPermission = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id).populate(
      "role"
    );
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    logger.info({
      action: "Fetch Permission",
      details: `Fetched permission ${permission._id} for module ${permission.module}`,
      performedBy: req.user.id,
      onRecord: permission._id,
    });
    res.json(permission);
  } catch (error) {
    logger.error({
      action: "Fetch Permission",
      error: error.message,
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(500).json({ message: error.message });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      {
        read: req.body.read,
        write: req.body.write,
        update: req.body.update,
        delete: req.body.delete,
      },
      { new: true }
    );
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    logger.info({
      action: "Update Permission",
      details: `Updated permission settings for ${permission._id}`,
      performedBy: req.user.id,
      onRecord: permission._id,
    });
    res.json(permission);
  } catch (error) {
    logger.error({
      action: "Update Permission",
      error: error.message,
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(400).json({ message: error.message });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission)
      return res.status(404).json({ message: "Permission not found" });
    logger.info({
      action: "Delete Permission",
      details: `Deleted permission ${req.params.id}`,
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(204).send();
  } catch (error) {
    logger.error({
      action: "Delete Permission",
      error: error.message,
      performedBy: req.user.id,
      onRecord: req.params.id,
    });
    res.status(500).json({ message: error.message });
  }
};
