// Error handler middleware to catch and respond to api errors

const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send({rror: err]);
};

module.exports = errorHandler;