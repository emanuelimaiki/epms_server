const nodemailer = require("nodemailer");
const User = require("../models/auth/User"); // assuming user model path
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password
  },
});

/**
 * Sends a verification email to the user with a verification link.
 * @param {User} user - User object from the database
 */
exports.sendVerificationEmail = async (user) => {
  const verificationUrl = `http://localhost:3000/api/auth/verify-email/${user.emailVerificationToken}`; // Placeholder URL

  const mailOptions = {
    from: '"Evoton PMS" <' + process.env.EMAIL_USER + ">", // sender address
    to: user.email, // list of receivers
    subject: "Email Verification", // Subject line
    text: `Hi ${user.firstname}, please verify your email by clicking on the following link: ${verificationUrl}`, // plain text body
    html: `<b>Hi ${user.firstname},</b><br>Please verify your email by clicking on the following link: <a href="${verificationUrl}">Verify Email</a>`, // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending verification email:", error);
    }
    console.log("Verification email sent:", info.messageId);
  });
};

exports.generateAndSendOTP = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6 digit OTP
  const otpExpiry = new Date(new Date().getTime() + 30 * 60 * 1000); // Set expiry for 30 minutes

  const user = await User.findOneAndUpdate(
    { email },
    { otp, otpExpiry },
    { new: true }
  );
  if (!user) throw new Error("User not found");

  const mailOptions = {
    from: '"Evoton PMS" <' + process.env.EMAIL_USER + ">",
    to: email,
    subject: "EPMS OTP",
    text: `Your OTP is ${otp}. It expires in 30 minutes.`,
    html: `<p>Your OTP is <strong>${otp}</strong>. It expires in 30 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
  return "OTP sent successfully";
};
