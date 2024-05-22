const express = require("express");
const router = express.Router();
const propertiesController = require("../../controllers/property/propertiesController");

const handleUpload = require("../../utils/fileUpload");

// Define the upload middleware for handling multiple images
const upload = handleUpload("properties").fields([
  { name: "images", maxCount: 10 },
]);

// POST /api/properties - Create a new property
router.post("/", upload, propertiesController.createProperty);

// GET /api/properties - Get all properties
router.get("/", propertiesController.getProperties);

// GET /api/properties/:id - Get a single property by ID
router.get("/:id", propertiesController.getProperty);

// PUT /api/properties/:id - Update a property
router.put("/:id", upload, propertiesController.updateProperty);

// DELETE /api/properties/:id - Delete a property
router.delete("/:id", propertiesController.deleteProperty);

module.exports = router;
