const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ZoneSchema = new mongoose.Schema(
  {
    name: {type: String, required: true ,unique: true},
    subzones:[{
      type: Schema.Types.ObjectId, 
      ref: 'Zone' 
    }],
    county:{
      type: String
    }
  },
  {timestamps: true},
);

const Zone = mongoose.model('Zone', ZoneSchema);
module.exports = Zone;
