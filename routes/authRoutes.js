const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/verify-email/:token", authController.verifyEmail);
router.post("/send-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTP);

router.post(
  "/reset-password-with-token",
  authController.verifyTokenAndResetPassword
);
router.post("/reset-password-with-otp", authController.resetPassword);

module.exports = router;
