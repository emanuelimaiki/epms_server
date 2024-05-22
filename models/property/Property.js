const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    landlord: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Landlord",
      required: true,
    },
    zone: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Zone",
      required: true,
    },
    title_deed_number: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    plot_no: {
      type: String,
      required: true,
      unique: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    floorplans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Floorplan",
      },
    ],
    chargeables: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chargeables",
      },
    ],
    payment_schedules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PaymentSchedule",
      },
    ],
    expected_landlord_payout: {
      type: Number,
      default: 0,
    },
    property_balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
