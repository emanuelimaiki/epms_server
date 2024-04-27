const mongoose = require('mongoose');
const TenantWalletSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tenant',
      required: true,
      trim: true,
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
const TenantWallets = mongoose.model('TenantWallets', TenantWalletSchema);
module.exports = TenantWallets;
