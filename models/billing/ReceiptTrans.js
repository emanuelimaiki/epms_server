const mongoose = require("mongoose");

const receiptTransactionSchema = new mongoose.Schema(
  {
    receipt: { type: mongoose.Schema.ObjectId, ref: "Receipt" },
    invoice: { type: mongoose.Schema.ObjectId, ref: "Invoice" }, // Reference to the related invoice
    receipt_date: { type: Date, default: Date.now },
    amount_paid: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ReceiptTransaction = mongoose.model(
  "ReceiptTransaction",
  receiptTransactionSchema
);

module.exports = ReceiptTransaction;
