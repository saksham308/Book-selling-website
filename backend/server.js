const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/booksRoutes"));
app.use(errorHandler);
app.listen(PORT, () => {
  console.log("first");
});
