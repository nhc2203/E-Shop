const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema(
  {
    seller: {
      type: Object,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Proccessing",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Withdraw", withdrawSchema);
