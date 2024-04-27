const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// Define the User schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: false,
    },
    workflow_state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkflowState",
    },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String, required: false },
    status: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      required: true,
    },
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model
const user = mongoose.model("User", userSchema);

module.exports = user;
