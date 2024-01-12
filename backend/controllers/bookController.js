// name: { type: String, required: true },
//     Author: { type: String, required: true },
//     description: { type: String, required: true },
//     price: {
//       type: Number,
//       required: true,
//       min: [0, "Price cannot be negative"],
//     },
//   },
const User = require("../models/users.model");
const Book = require("../models/books.model");
const asyncHandler = require("express-async-handler");

const getAllbooksDetails = asyncHandler(async (req, res) => {
  const books = await Book.find();
  res.status(200).json(books);
});

const uploadBook = asyncHandler(async (req, res) => {
  const { bookName, author, description, price } = req.body;

  if (!bookName || !author || !description || !price) {
    res.status(400);
    throw new Error("Please add text field");
  }
  const book = await Book.create({
    user: req.user.id,
    bookName,
    author,
    price,
    description,
  });
  res.status(200).json(book);
});

const getSingleBook = asyncHandler(async (req, res) => {
  const books = await Book.find({ _id: req.params.id });
  if (!books) {
    res.status(400);
    throw new Error("Book not found");
  }
  res.status(200).json(books);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById({ _id: req.params.id });
  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBook);
});
module.exports = { uploadBook, updateBook, getAllbooksDetails, getSingleBook };
