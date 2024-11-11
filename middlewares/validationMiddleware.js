// Validation Middleware for validating data before accessing it in the API requests
const validationMiddleware = (req, res, next) => {
  const data = req.body;
  if (!data email || data.password) {
    return res.status(400).json({ message: "Missing required information." });
  }
  next();
};
module.exports = validationMiddleware;