const mongoose = require("mongoose");

const historicalOccupancySchema = new mongoose.Schema(
  {
    floor: {
      type: mongoose.Schema.ObjectId,
      ref: "Floorplan",
      required: true,
    },
    tenant: { type: mongoose.Schema.ObjectId, ref: "Tenant", required: true },
    occupancyStartDate: { type: Date, required: true, set: formatDate },
    occupancyEndDate: { type: Date, default: null, set: formatDateOrNull },
    occupancyStatus: {
      type: String,
      enum: ["Active", "Vacated"],
      default: "Active",
    },
    status: { type: Number, default: 0 },
    // You can add more fields as needed for tracking historical data
  },
  { timestamps: true }
);
function formatDate(date) {
  if (date instanceof Date) {
    return date; // If it's already a Date object, return as is
  }
  // Otherwise, create a new Date object from the provided value
  return new Date(date).getTime();
}

function formatDateOrNull(date) {
  if (!date) {
    return null; // If the value is null, return null
  }
  console.log(date);
  // If it's a Date object, return it, otherwise, create a new Date object
  return date instanceof Date ? date : new Date(date).getTime();
}
const HistoricalOccupancy = mongoose.model(
  "HistoricalOccupancy",
  historicalOccupancySchema
);

module.exports = HistoricalOccupancy;
