const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//This records when the landlord has been paid and tenant has run with the money.

const Pre_PaymentSchema = new mongoose.Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    floorplan: {
      type: Schema.Types.ObjectId,
      ref: 'Floorplan',
      required: true,
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: 'Landlord',
      required: true,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: 'Invoice',
      required: true,
    },
    deduct_Month: {   
      type: String,
      required: true,
    },
    deduct_amount: {
      type: Number,
      required: true,
    },
    paidMonth: {
      type: String,
      required: true,
    },
    paidYear: {
      type: String,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      // required: true,
    },
    remarks:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const Pre_Payment = mongoose.model('Pre_Payment', Pre_PaymentSchema);

module.exports = Pre_Payment