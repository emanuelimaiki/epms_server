const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentAccountSchema = new mongoose.Schema({
  name: String,
  landlord: {
    type: Schema.Types.ObjectId,
    ref: "Landlord",
  },
  type: {
    type: String,
    required: true,
  },
  bank_name: {
    type: String,
  },
  account_no: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
  },
  account_name: {
    type: String,
    required: true,
  },
});

const PaymentAccount = mongoose.model("PaymentAccount", paymentAccountSchema);
module.exports = PaymentAccount
