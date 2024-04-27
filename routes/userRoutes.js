// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requiresAuth } = require("express-openid-connect");

// Define the registration route
router.post("/register", userController.registerUser);

router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
