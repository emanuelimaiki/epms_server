const express = require("express");
const router = express.Router();
const zonesController = require("../../controllers/zonesController");

// POST /api/zones - Create a new zone
router.post("/", zonesController.createZone);

// POST /api/zones - Create a new subzone
router.post("/createsubzone", zonesController.createSubZone);

// GET /api/zones - Get all zones
router.get("/", zonesController.getZones);

// GET /api/zones/:id - Get a single role by ID
router.get("/:id", zonesController.getZone);

// PUT /api/zones/:id - Update a role
router.put("/:id", zonesController.updateZone);

// DELETE /api/zones/:id - Delete a role
router.delete("/:id", zonesController.deleteZone);

module.exports = router;
