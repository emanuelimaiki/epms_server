const mongoose = require('mongoose');

const LandlordWalletSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.Schema.ObjectId,
      ref: 'Property',
      required: true,
      trim: true,
      immutable: true,
      unique: true,
    },
    balance: {
      type: mongoose.Decimal128,
      required: true,
      default: 0.0,
    },
  },
  {timestamps: true},
);
const LandlordWallets = mongoose.model('LandlordWallets', LandlordWalletSchema);
module.exports = LandlordWallets;
