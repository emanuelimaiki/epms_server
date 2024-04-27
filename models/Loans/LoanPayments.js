const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//This records when the landlord has been paid.

const LoanPaymentSchema = new mongoose.Schema(
  {
    Loan: {
      type: Schema.Types.ObjectId,
      ref: 'Loan',
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

const LoanPayment = mongoose.model('LoanPayment', LoanPaymentSchema);
module.exports = LoanPayment