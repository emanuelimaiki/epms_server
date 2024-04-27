const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LandlordSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: String,
    last_name: {
      type: String,
    },
    id_number: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    agreement_path: {
      type: String,
    },
    contract_path: {
      type: String,
    },
    zone: {
      type: Schema.Types.ObjectId,
      ref: 'Zone',
    },
    plots: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
    accounts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PaymentAccount',
      },
    ],
    loans: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Loans',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Landlord = mongoose.model('Landlord', LandlordSchema);

module.exports = Landlord;
