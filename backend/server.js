const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const rateLimit = require("./config/ratelimiter");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

connectDB();

//middlewares
// app.use(rateLimit);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/booksRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

//error handler
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("first");
});
