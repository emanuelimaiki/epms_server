const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PaymentAccount",
    required: true,
  },
  transactionDate: { type: Date, required: true },
  description: { type: String, required: true },
  debit: { type: Number, default: 0 },
  credit: { type: Number, default: 0 },
  balance: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      "Pending",
      "Paid",
      "Cancelled",
      "Refunded" /* Add more statuses as needed */,
    ],
    default: "Pending",
  },
});

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
