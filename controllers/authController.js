const User = require("../models/auth/User");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/emailHelper");

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, role } = req.body;
    const emailVerificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const user = new User({
      firstname,
      lastname,
      email,
      phone,
      password,
      role,
      emailVerificationToken,
    });

    await user.save();
    sendVerificationEmail(user); // Assuming function exists in emailHelper
    // sendVerificationSMS(user); // Assuming function exists in phoneHelper

    res
      .status(201)
      .send({ message: "User registered, verify email and phone!" });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (
      !user ||
      !(await user.comparePassword(password)) ||
      !user.isEmailVerified
    ) {
      return res.status(401).send({ message: "verify email to log in" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      email: decoded.email,
      emailVerificationToken: token,
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid or expired token." });
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = ""; // Clear the token once verified
    await user.save();

    res.status(200).send({ message: "Email successfully verified!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

exports.requestOTP = async (req, res) => {
  try {
    const response = await generateAndSendOTP(req.body.email);
    res.send({ message: response });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  const now = new Date();
  if (now > user.otpExpiry) {
    return res.status(400).send({ message: "OTP has expired." });
  }

  if (user.otp !== otp) {
    return res.status(400).send({ message: "Invalid OTP." });
  }

  user.otp = null; // Clear the OTP once verified
  user.otpExpiry = null;
  await user.save();

  res.send({ message: "OTP verified successfully." });
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({
    email: email,
    otp: otp,
    otpExpiry: { $gt: Date.now() },
  });

  if (!user) return res.status(400).send("OTP is invalid or has expired.");

  user.password = await bcrypt.hash(newPassword, 8);
  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.send("Password has been reset successfully.");
};
exports.verifyTokenAndResetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      passwordResetToken: token,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user)
      return res
        .status(400)
        .send("Password reset token is invalid or has expired.");

    user.password = await bcrypt.hash(newPassword, 8);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.send("Password has been reset successfully.");
  } catch (error) {
    res.status(500).send("Failed to reset password.");
  }
};
