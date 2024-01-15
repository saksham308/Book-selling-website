const rateLimit = require("express-rate-limit");
const rateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 15 minutes
  limit: 60, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
});
module.exports = rateLimiter;
