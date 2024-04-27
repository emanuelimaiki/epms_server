const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZoneSchema = new mongoose.Schema(
  {
    name: {type: String, default: '', required: true},
    area: {type: String},
  },
  {timestamps: true},
);

module.exports = mongoose.model('Zone', ZoneSchema);
