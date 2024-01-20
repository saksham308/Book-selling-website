const mongoose = require("mongoose");

const bookTransactionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Buyer information is required"],
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Seller information is required"],
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: [true, "Book information is required"],
  },
  transactionDate: {
    type: Date,
    default: Date.now,
  },
});

// Create models based on the schemas

module.exports = mongoose.model("bookTransactionSchema", bookTransactionSchema);
