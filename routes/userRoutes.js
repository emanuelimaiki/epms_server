// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requiresAuth } = require("express-openid-connect");
const checkPermission = require("../middleware/roleMiddleware");

// Define the registration route
router.post("/register", userController.registerUser);

router.get(
  "/some-resource",
  checkPermission("some-resource", "read"),
  (req, res) => {
    res.json({ message: "Success" });
  }
);

router.post(
  "/some-resource",
  checkPermission("some-resource", "write"),
  (req, res) => {
    res.json({ message: "Resource created" });
  }
);

module.exports = router;
