// This file checks authentication token to ensure users have access to api routes.

require('firebase');

const authMiddleware = (req, res, next) => {
  const token = req.headers.token || null;
  if (!token) {
    res.status(1).send('Authentication failed: Token missing.');
    return;
  }

  firebase.auth(token).then((ecodedUser) => {
    req.user = ecodedUser;
    next();
  }).catch(() => {
    res.status(1).send('Invalid token.');
  });
};

module.exports = authMiddleware;