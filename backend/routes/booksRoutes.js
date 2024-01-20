const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multerMiddlerware");
const {
  getAllbooksDetails,
  updateBook,
  uploadBook,
  getSingleBook,
  deleteBook,
} = require("../controllers/bookController");
router
  .get("", auth, getAllbooksDetails)
  .post(
    "",
    auth,
    upload.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      { name: "pdf", maxCount: 1 },
    ]),
    uploadBook
  )
  .get("/:id", auth, getSingleBook)
  .put("/:id", auth, updateBook)
  .delete("/:id", auth, deleteBook);
module.exports = router;
