const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("School", schoolSchema);
