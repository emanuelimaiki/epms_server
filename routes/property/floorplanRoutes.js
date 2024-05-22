const express = require("express");
const router = express.Router();
const floorplanController = require("../../controllers/property/floorplanController");

// POST /api/floorplans - Create a new floorplan
router.post("/", floorplanController.createFloorplan);

// GET /api/floorplans - Get all floorplans
router.get("/", floorplanController.getFloorplans);

// GET /api/floorplans/vacant - Get all vacant floorplans
router.get("/vacant", floorplanController.getVacantFloorplans);

// GET /api/floorplans/:id - Get a single floorplan by ID
router.get("/:id", floorplanController.getFloorplan);

// PUT /api/floorplans/:id - Update a floorplan
router.put("/:id", floorplanController.updateFloorplan);

// DELETE /api/floorplans/:id - Delete a floorplan
router.delete("/:id", floorplanController.deleteFloorplan);

module.exports = router;
