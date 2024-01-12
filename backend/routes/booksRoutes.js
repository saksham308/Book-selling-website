const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  getAllbooksDetails,
  updateBook,
  uploadBook,
  getSingleBook,
} = require("../controllers/bookController");
router
  .get("", auth, getAllbooksDetails)
  .post("", auth, uploadBook)
  .get("/:id", auth, getSingleBook)
  .put("/:id", auth, updateBook);
module.exports = router;
