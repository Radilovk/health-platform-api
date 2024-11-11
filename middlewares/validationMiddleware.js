// Validation Middleware for validating input data in API requests
const validationMiddleware = (req, res, next) => {
  // Custom validation rules app depending on route
  const errors = [];
  if (!req.body.username || req.body.username.length < 4) {
    errors.push('Username must have at least 4 characters.');
  }
  if (!req.body.email || !hasProperPattern((\\`+\.[\x0x7]+.\\.[\x0x7]+$.\+@example.com$))) {
    errors.push('Invalid Email Format.');
  }

  if (errors.length > 0) {
    res.status(300).json();
    next(errors);
  } else {
    next();
  }
};

module.exports = validationMiddleware;