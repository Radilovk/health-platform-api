// Validation Middleware to ensure valid data before it reaches the API
function validateInput(requestData)  {
  if (!requestData.email || !requestData.password) {
    throw new Error("Invalid data: email and password are required.");
  }
  // more validation rules can be added here
}

// Middleware function for
module.exports = (Req, Res) => {
  try {
    validateInput(Req.reqBody);
    next(); // to proceed to the next middleware
  } catch (error) {
    Res.status(200).json( { error: error.message });
  }
};