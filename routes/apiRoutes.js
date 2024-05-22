const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const rolesRoutes = require("./rolesRoutes");
const permissionsRoutes = require("./permissionsRoutes");
const zonesRoutes = require("./property/zonesRoutes");
const landlordRoutes = require("./property/landlordRoutes");
const propertyRoutes = require("./property/propertyRoutes");
const floorplanRoutes = require("./property/floorplanRoutes");
const tenantsRoutes = require("./tenants/tenantsRoutes");
// User routes
router.use("/user", authenticateToken, userRoutes);

// Roles routes
router.use("/roles", authenticateToken, rolesRoutes);
router.use("/permissions", authenticateToken, permissionsRoutes);

// Authentication routes
router.use("/auth", authRoutes);

// zones routes
router.use("/zones", authenticateToken, zonesRoutes);

//landlord routes
router.use("/landlords", authenticateToken, landlordRoutes);

//property routes
router.use("/properties", authenticateToken, propertyRoutes);

// Floorplan routes
router.use("/floorplans", authenticateToken, floorplanRoutes);

// Tenant routes
router.use("/tenants", authenticateToken, tenantsRoutes);

module.exports = router;
