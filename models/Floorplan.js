const mongoose = require("mongoose");

const floorplanSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: "Property",
      required: true,
    },
    floornumber: { type: Number, default: "" },
    deposit: { type: Number, default: 0 },
    apt_tag: { type: String, required: true },
    monthlyincome: { type: Number, default: "", required: true },
    yearlyincome: { type: Number, default: "" },
    marketvalue: { type: Number, default: "" },
    isoccupied: { type: Boolean, default: false },
    tenant: { type: mongoose.Schema.ObjectId, default: undefined },
    elec_meter: { type: String, default: "" },
    water_meter: { type: String, default: 0 },
    last_water_reading: { type: Number, default: "" },
    current_water_reading: { type: Number, default: "" },
    status: { type: String, default: 0 },
  },
  { timestamps: true }
);
floorplanSchema.index({ property: 1, apt_tag: 1 }, { unique: true });

const Floorplan = mongoose.model("Floorplan", floorplanSchema);

module.exports = Floorplan;
