const express = require("express");
const router = express.Router();
const rolesController = require("../controllers/rolesController");

// POST /api/roles - Create a new role
router.post("/", rolesController.createRole);

// GET /api/roles - Get all roles
router.get("/", rolesController.getRoles);

// GET /api/roles/:id - Get a single role by ID
router.get("/:id", rolesController.getRole);

// PUT /api/roles/:id - Update a role
router.put("/:id", rolesController.updateRole);

// DELETE /api/roles/:id - Delete a role
router.delete("/:id", rolesController.deleteRole);

module.exports = router;
