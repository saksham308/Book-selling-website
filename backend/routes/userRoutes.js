const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  login,
  register,
  getUserInfo,
  userBooks,
} = require("../controllers/userController");
router
  .post("/login", login)
  .post("/register", register)
  .get("", auth, getUserInfo)
  .get("/getBooks", auth, userBooks);
module.exports = router;
