const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//This records when the landlord has been paid.

const PayoutSchema = new mongoose.Schema(
  {
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'Landlord',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    paidMonth: {
      type: String,
      required: true,
    },
    paidYear: {
      type: String,
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Payout = mongoose.model('Payout', PayoutSchema);
module.exports = Payout