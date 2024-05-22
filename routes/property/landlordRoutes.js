const express = require("express");
const router = express.Router();
const landlordsController = require("../../controllers/property/landlordsController");

const handleUpload = require("../../utils/fileUpload");

// Define the upload middleware for handling multiple images
const upload = handleUpload("landlords").fields([
  { name: "agreement", maxCount: 1 },
  { name: "contract", maxCount: 1 },
]);
// POST /api/Landlords - Create a new Landlord
router.post("/", upload, landlordsController.createLandlord);

// GET /api/Landlords - Get all Landlords
router.get("/", landlordsController.getLandlords);

// GET /api/Landlords/:id - Get a single landlord by ID
router.get("/:id", landlordsController.getLandlord);

// PUT /api/Landlords/:id - Update a landlord
router.put("/:id", upload, landlordsController.updateLandlord);

// DELETE /api/Landlords/:id - Delete a landlord
router.delete("/:id", landlordsController.deleteLandlord);

module.exports = router;
