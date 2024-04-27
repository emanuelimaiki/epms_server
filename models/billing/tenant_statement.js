const mongoose = require('mongoose');
const {required} = require('nodemon/lib/config');

const tenantStatementSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tenant',
      required: true,
    },
    receipt: {
      type: mongoose.Schema.ObjectId,
      ref: 'Receipt',
      default: undefined,
    },
    house: {
      type: mongoose.Schema.ObjectId,
      ref: 'Floorplan',
      required: true,
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

const TenantStatement = mongoose.model('TenantStatement', tenantStatementSchema);

module.exports = TenantStatement;
