const express = require("express");
const router = express.Router();
const permissionsController = require("../controllers/permissionsController");
const checkPermission = require("../middleware/roleMiddleware");

router.post(
  "/",
  checkPermission("Permissions", "write"),
  permissionsController.createPermission
);
router.get(
  "/",
  checkPermission("Permissions", "read"),
  permissionsController.getPermissions
);
router.get(
  "/:id",
  checkPermission("Permissions", "read"),
  permissionsController.getPermission
);
router.put(
  "/:id",
  checkPermission("Permissions", "update"),
  permissionsController.updatePermission
);
router.delete(
  "/:id",
  checkPermission("Permissions", "delete"),
  permissionsController.deletePermission
);

module.exports = router;
