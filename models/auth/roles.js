const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);
roleSchema.index(
  { name: 1 },
  { unique: true, collation: { locale: "en", strength: 2 } }
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
