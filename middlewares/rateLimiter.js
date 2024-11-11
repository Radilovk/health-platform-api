// Rate Limiter middleware for avoiding abusive API request spikes and controlling rate of requests
const limit = require("express-rate-limit");
const limitTimer = limit(20, {
  window: 10 * 100,
  message: "Too many requests. Please wait a few seconds and try again!",
});

module.exports = limitTimer;
