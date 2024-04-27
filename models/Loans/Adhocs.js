const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//This records when the landlord has been paid.

const AdhocsSchema = new mongoose.Schema(
  {
    Landlord: {
      type: Schema.Types.ObjectId,
      ref: 'Landlord',
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
    totalAmount: {
      type: Number,
      default: function () { return this.amountPaid; },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Adhocs = mongoose.model('Adhocs', AdhocsSchema);
module.exports = Adhocs