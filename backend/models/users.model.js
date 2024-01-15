const mongoose = require("mongoose");
const walletTransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const User_schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: {
      type: Number,
      default: 100,
    },
    deposits: [walletTransactionSchema],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User_schema);
