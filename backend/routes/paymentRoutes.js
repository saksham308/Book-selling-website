const express = require("express");
const router = express.Router();

const { payment } = require("../controllers/paymentController");
const auth = require("../middlewares/authMiddleware");
router.post("/:id", auth, payment);
module.exports = router;
