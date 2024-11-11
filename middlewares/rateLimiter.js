// Rate limiter middleware to protect api from over-usage
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  window: 60,
  maxRequests: 100,
  message: "Too many requests from this ip address, try later."
});

module.exports = limiter;