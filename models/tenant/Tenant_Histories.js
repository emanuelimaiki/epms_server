const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TenantHistoriesSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "Tenants",
      required: true,
    },
    floorplan: {
      type: Schema.Types.ObjectId,
      ref: "Floorplan",
      required: true,
    },
    date_from: {
      type: Date,
      default: Date.now(),
    },
    date_to: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Active", "Vacated"],
      default: "Active", //can be active or vacated
    },
    remarks: {
      type: String,
    },
  },
  { timestamps: true }
);

const Tenant_Histories = mongoose.model(
  "Tenant_Histories",
  TenantHistoriesSchema
);

module.exports = Tenant_Histories;
