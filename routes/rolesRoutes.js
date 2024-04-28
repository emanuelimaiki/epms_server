const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesController");
const Role = require("../models/auth/roles");
const { logger } = require("../logger");

// POST /api/roles - Create a new role
router.post("/", async (req, res) => {
  try {
    const newRole = new Role({
      name: req.body.name,
    });
    const savedRole = await newRole.save();
    logger.info({
      action: "Add Role",
      performedBy: req.user.id,
      onRecord: newRole,
    });
    res.status(201).json(savedRole);
  } catch (error) {
    logger.error({
      action: "Add Role",
      performedBy: req.user.id,
      onRecord: error.message,
    });
    res.status(400).json({ message: error.message });
  }
});

// GET /api/roles - Get all roles
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/roles/:id - Get a single role by ID
router.get("/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/roles/:id - Update a role
router.put("/:id", async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name: req.body.name },
      },
      { new: true }
    );
    res.json(updatedRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/roles/:id - Delete a role
router.delete("/:id", async (req, res) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
