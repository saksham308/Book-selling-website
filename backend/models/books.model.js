const mongoose = require("mongoose");
const Book_schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookName: { type: String, required: true },
    author: { type: String, required: true },
    coverPage: {
      data: String,
    },
    pdf: { type: String, required: true },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Book", Book_schema);
