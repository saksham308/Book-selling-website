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
  userBoughtBooks,
} = require("../controllers/bookController");
router
  .get("", auth, getAllbooksDetails)
  .get("/boughtBooks", auth, userBoughtBooks)
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
  .get(
    "/:id",
    auth,
    upload.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      { name: "pdf", maxCount: 1 },
    ]),
    getSingleBook
  )
  .put(
    "/:id",
    auth,
    upload.fields([
      {
        name: "coverImage",
        maxCount: 1,
      },
      { name: "pdf", maxCount: 1 },
    ]),
    updateBook
  )
  .delete("/:id", auth, deleteBook);
module.exports = router;
