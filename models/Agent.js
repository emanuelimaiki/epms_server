const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
      unique: true,
    },
    field_manager: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "fieldManager",
    },
    properties: [
      {
        property: {
          type: mongoose.Schema.ObjectId,
          ref: "Property",
        },
        commission: { type: Number, default: 0 },
        active: {
          type: Boolean,
          default: true,
        },
        from_date: { type: Date, default: Date.now },
        to_date: { type: Date, default: undefined },
      },
    ],
  },

  { timestamps: true }
);

// Create the Mongoose model for agentproperty
const Agents = mongoose.model("Agents", agentSchema);

module.exports = Agents; // Export the model to be used in other files
