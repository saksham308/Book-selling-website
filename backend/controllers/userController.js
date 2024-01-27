const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/users.model");
const Book = require("../models/books.model");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    username: name,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.username,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.username,
      email: user.email,
      token: generateToken(user.id),
      balance: user.balance,
      deposits: user.deposits,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
const userBooks = asyncHandler(async (req, res) => {
  // console.log(req);
  const books = await Book.find({ user: req.user.id });
  res.status(200).json(books);
});
module.exports = { login, userBooks, register };
