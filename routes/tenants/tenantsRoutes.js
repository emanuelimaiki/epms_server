const express = require("express");
const router = express.Router();
const tenantController = require("../../controllers/tenant/tenantController");
const handleUpload = require("../../utils/fileUpload");

// Define the upload middleware for handling multiple images
const upload = handleUpload("tenants").fields([
  { name: "photo", maxCount: 1 },
  { name: "agreement", maxCount: 1 },
]);

// POST /api/tenants - Create a new tenant
router.post("/", upload, tenantController.createTenant);

// GET /api/tenants - Get all tenants
router.get("/", tenantController.getTenants);

// GET /api/tenants/vacate - vacate a tenant
router.get("/vacate/:id", tenantController.vacateTenant);

// GET /api/tenants/:id - Get a single tenant by ID
router.get("/:id", tenantController.getTenant);

// PUT /api/tenants/:id - Update a tenant
router.put("/:id", upload, tenantController.updateTenant);

// DELETE /api/tenants/:id - Delete a tenant
router.delete("/:id", tenantController.deleteTenant);

module.exports = router;
