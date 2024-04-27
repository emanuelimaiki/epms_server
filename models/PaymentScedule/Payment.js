const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//This records when the landlord has been paid.

const PaymentSchema = new mongoose.Schema(
  {
    plot: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentAccount',
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },

    amountPaid: {
      type: mongoose.Decimal128,
      required: true,
    },
    paymentReason: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model('Payment', PaymentSchema);
module.exports = Payment;
