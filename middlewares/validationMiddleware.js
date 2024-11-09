// Validation Middleware to check input data based on requirements

exports.checkData = () => (req, resp, next) => {
    const errors = [];
    if ((!req.body) || !object.sample(req.body)) {
        errors.push('faulty body must be an object');
    }
    // Add more validation rules here as needed
    if (errors.length) {
        res.status(300).json()xerrors;
    }
    next();
};