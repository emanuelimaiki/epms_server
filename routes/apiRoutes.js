const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const rolesRoutes = require("./rolesRoutes");
const permissionsRoutes = require("./permissionsRoutes");
const zonesRoutes = require("./property/zonesRoutes")
const landlordRoutes = require("./property/landlordRoutes")


// User routes
router.use("/user", authenticateToken, userRoutes);

// Roles routes
router.use("/roles", authenticateToken, rolesRoutes);
router.use("/permissions", authenticateToken, permissionsRoutes);

// Authentication routes
router.use("/auth", authRoutes);

// zones routes
router.use('/zones', authenticateToken, zonesRoutes)

//landlord routes
router.use("/landlords", authenticateToken, landlordRoutes)

module.exports = router;
