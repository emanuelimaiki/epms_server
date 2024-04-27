const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChargeableSchema = new mongoose.Schema(
  {
    item_name: {type: String, required: true},
    amount: {type: Number, required: true},
    type: {type: String, required: true},
    is_landlord_statement_item: {type: Boolean, default: false},
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('Chargeables', ChargeableSchema);
