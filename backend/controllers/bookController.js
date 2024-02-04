const Book = require("../models/books.model");
const Transaction = require("../models/transactionSchema.model");
const User = require("../models/users.model");
const asyncHandler = require("express-async-handler");
const {
  uploadOnCloudinary,
  deleteOnCloudinary,
} = require("../utils/cloudinary");
const getAllbooksDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  // console.log(user.boughtBooks);
  const books = await Book.find({ _id: { $nin: user.boughtBooks } });
  const avaiableBooks = books.filter(
    (book) => book.user.toString() !== req.user.id
  );
  res.status(200).json(avaiableBooks);
});

const uploadBook = asyncHandler(async (req, res) => {
  const { bookName, author, description, price } = req.body;
  // console.log(req);
  if (!bookName || !author || !description || !price) {
    res.status(400);
    throw new Error("Please add all field");
  }
  let coverImageLocalPath;
  let pdfLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (req.files && Array.isArray(req.files.pdf) && req.files.pdf.length > 0) {
    pdfLocalPath = req.files.pdf[0].path;
  }
  if (!pdfLocalPath) {
    throw new Error(" Book pdf not found!");
  }
  const pdfFile = await uploadOnCloudinary(pdfLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!pdfFile) {
    res.status(400);
    throw new Error(" Book pdf not found!");
  }
  const book = await Book.create({
    user: req.user.id,
    bookName,
    author,
    pdf: {
      publicURL: pdfFile.url,
      publicID: pdfFile.public_id,
    },
    coverPage: {
      publicURL: coverImage?.url || "",
      publicID: coverImage?.public_id || "",
    },
    price,
    description,
  });
  const createdBook = await Book.findById({ _id: book._id });
  if (!createdBook) {
    res.status(500);
    throw new Error("Something went wrong while uploading book");
  }
  res.status(200).json(book);
});

const getSingleBook = asyncHandler(async (req, res) => {
  const books = await Book.find({ _id: req.params.id });
  if (!books) {
    res.status(400);
    throw new Error("Book not found");
  }
  res.status(201).json(books);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findById({ _id: req.params.id });
  const { bookName, author, description, price } = req.body;
  if (!book) {
    res.status(400);
    throw new Error("Book not found");
  }
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  let coverImageLocalPath;
  let pdfLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }
  if (req.files && Array.isArray(req.files.pdf) && req.files.pdf.length > 0) {
    pdfLocalPath = req.files.pdf[0].path;
  }
  let updatedObject = {};
  if (bookName) {
    updatedObject.bookName = bookName;
  }
  if (author) {
    updatedObject.author = author;
  }
  if (price) {
    updatedObject.price = price;
  }
  if (description) {
    updatedObject.description = description;
  }
  if (pdfLocalPath) {
    // console.log(pdfFile);
    await deleteOnCloudinary(book.pdf.publicID);
    const pdfFile = await uploadOnCloudinary(pdfLocalPath);

    updatedObject.pdf = { publicURL: pdfFile.url, publicID: pdfFile.public_id };
  }
  if (coverImageLocalPath) {
    await deleteOnCloudinary(book?.coverPage?.publicID);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log(coverImage);
    updatedObject.coverPage = {
      publicURL: coverImage.url,
      publicID: coverImage.public_id,
    };
  }
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: updatedObject,
    },
    {
      new: true,
    }
  );

  res.status(201).json(updatedBook);
});
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(401);
    throw new Error("Book not found!!");
  }
  if (book.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!!");
  }

  const pdfFileId = book.pdf.publicID;
  const coverImageID = book?.coverPage?.publicID;
  await deleteOnCloudinary(pdfFileId);
  coverImageID ? await deleteOnCloudinary(coverImageID) : "";
  await Book.deleteOne({ _id: req.params.id });
  res.status(201).json({ id: req.params.id });
});
const userBoughtBooks = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  const books = await Book.find({ _id: { $in: user.boughtBooks } });
  res.status(200).json(books);
});
module.exports = {
  userBoughtBooks,
  uploadBook,
  updateBook,
  getAllbooksDetails,
  getSingleBook,
  deleteBook,
};
