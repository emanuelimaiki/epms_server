const express = require("express");
const router = express.Router();
const landlordsController = require("../../controllers/property/landlordsController");
const multer = require("multer");
const path = require('path');
const authenticateToken = require("../../middleware/authMiddleware");

// Define the storage location for the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/landlords');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.fieldname + "-" + Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize multer middleware
const upload = multer({ storage });

// POST /api/Landlords - Create a new Landlord
router.post("/", authenticateToken, upload.fields([
    { name: 'agreement', maxCount: 1 },
    { name: 'contract', maxCount: 1 }
]), landlordsController.createLandlord);

// GET /api/Landlords - Get all Landlords
router.get("/", authenticateToken, landlordsController.getLandlords);

// GET /api/Landlords/:id - Get a single landlord by ID
router.get("/:id", authenticateToken, landlordsController.getLandlord);

// PUT /api/Landlords/:id - Update a landlord
router.put("/:id", authenticateToken, landlordsController.updateLandlord);

// DELETE /api/Landlords/:id - Delete a landlord
router.delete("/:id", authenticateToken, landlordsController.deleteLandlord);

module.exports = router;
