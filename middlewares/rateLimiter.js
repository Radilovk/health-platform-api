// Rate limiting middleware for protecting against too frequent API calls
const limst = require('rate-limit');
const rateLimiter = limst(
  {
  max: 100,
  window: 60,
  message: "Too many requests from your IP within a minute. Please try again later."
  }
);

module.exports = rateLimiter;