const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema(
  {
    floor_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Floorplan",
      required: true,
    },
    tenant: { type: mongoose.Schema.ObjectId, ref: "Tenant", required: true },
    receipt_no: { type: Number, default: 0 },
    receipt_date: { type: Date, default: Date.now },
    amount: { type: Number, default: 0 },
    payment_method: { type: String, default: "" },
    reference: { type: String, default: "" },
    created_by: { type: String, default: "" },
    overpayment: { type: Number, default: 0 }, // Field to capture overpayment amount
    reversed: { type: Boolean, default: false },
    status: { type: Number, default: 0 },
    refunded: { type: Boolean, default: true },
    sync: { type: Boolean, default: false },
  },
  { timestamps: true }
);

receiptSchema.pre("save", async function (next) {
  const doc = this;
  if (!doc.receipt_no) {
    try {
      const lastDocument = await Receipt.findOne(
        {},
        {},
        { sort: { receipt_no: -1 } }
      );
      doc.receipt_no = (lastDocument && lastDocument.receipt_no + 1) || 1;
      next();
      receipt_no;
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});
const Receipt = mongoose.model("Receipt", receiptSchema);

module.exports = Receipt;
