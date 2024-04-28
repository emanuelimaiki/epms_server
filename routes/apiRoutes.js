const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const rolesRoutes = require("./rolesRoutes");
const authenticateToken = require("../middleware/authMiddleware");

// User routes
router.use("/user", authenticateToken, userRoutes);

// Roles routes
router.use("/roles", authenticateToken, rolesRoutes);

// Authentication routes
router.use("/auth", authRoutes);

module.exports = router;
