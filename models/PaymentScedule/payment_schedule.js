const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentScheduleSchema = new mongoose.Schema(
  {
    name: String,
    plot: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
    day: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'PaymentAccount',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('PaymentSchedule', PaymentScheduleSchema);
