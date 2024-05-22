const mongoose = require("mongoose");

const kinsSchema = new mongoose.Schema({
  kins_name: { type: String, default: "" },
  kins_tel: { type: String, default: "" },
  kins_email: { type: String, default: "" },
});
const tenantSchema = new mongoose.Schema(
  {
    current_floor: {
      type: mongoose.Schema.ObjectId,
      ref: "Floorplan",
      default: null,
    },
    first_name: { type: String, required: true },
    middle_name: { type: String },
    last_name: { type: String, required: true },
    phone_number: { type: String, unique: true, required: true },
    email: { type: String, unique: true },
    photo_path: { type: String, default: "" },
    kra_pin: { type: String, unique: true },
    workplace: { type: String, default: "" },
    id_number: { type: String, unique: true, required: true },
    postal_address: { type: String, default: "" },
    next_of_kins: [kinsSchema],
    reg_date: { type: Date, default: Date.now },
    agreement: { type: String, required: false },
    // agent_id: { type: String, default: "" },
    vacated: { type: Boolean, default: false },
    // tenant_account: { type: String, default: "" },
    // bank_id: { type: String, default: "" },
    // sync: { type: String, default: 0 },
    status: { type: Number, default: 0 },
    histories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant_Histories",
      },
    ],
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenantSchema);

module.exports = Tenant;
