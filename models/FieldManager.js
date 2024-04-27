const mongoose = require("mongoose");

const fieldManagerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
  },
  { timestamps: true }
);

// Create the Mongoose model for agentproperty
const fieldManager = mongoose.model("fieldManager", fieldManagerSchema);

module.exports = fieldManager; // Export the model to be used in other files
