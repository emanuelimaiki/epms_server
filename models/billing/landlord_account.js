const mongoose = require('mongoose');
const {required} = require('nodemon/lib/config');

const landlordAccountSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: true,
      default: undefined,
    },
    house: {
      type: mongoose.Schema.ObjectId,
      ref: 'Floorplan',
      required: true,
      default: undefined,
    },
    expense: {
      type: mongoose.Schema.ObjectId,
      ref: 'Expense',
      default: undefined,
    },
    invoice: {
      type: mongoose.Schema.ObjectId,
      ref: 'Invoice',
      default: undefined,
    }, // Reference to the related invoice
    trans_date: {type: Date, default: Date.now},
    amount: {type: Number, default: 0, required: true},
    balance_before: {type: Number, default: 0, required: true},
    balance_after: {type: Number, default: 0, required: true},
  },
  {timestamps: true},
);

const landlordAccount = mongoose.model('LandlordAccount', landlordAccountSchema);

module.exports = landlordAccount;
