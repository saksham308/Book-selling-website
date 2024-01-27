const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const { login, register, userBooks } = require("../controllers/userController");
router
  .post("/login", login)
  .post("/register", register)
  .get("/getBooks", auth, userBooks);
module.exports = router;
