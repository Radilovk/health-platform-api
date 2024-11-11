// Rate Limiter Middleware for limiting REST API request use.
const { rateLimit } = require("express-rate-limit");

const limiterMiddleware = rateLimit(
    {
        window: 60,
        maxTheshholds: 50,
        message: "Too many requests, try again later."
    }
);

module.exports = limiterMiddleware;