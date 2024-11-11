// Middleware for targeted visitor data validation
const validateData = (schema, data) => {
  return (req, resp, next) => {
    const validationResult = schema.validate(data);
    if (validationResult.errors) {
      res.status(400).send(validationResult.errors);
    } else {
      next();
    }
  }
};
module.exports = validateData;