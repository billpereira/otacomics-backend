// This middleware is needed to validate if user is logged in or not
module.exports = (req, res, next) => {
  // If there is no user on incoming request
  // should return HTTP 401 with error
  if (!req.user) {
    return res.status(401).send({ error: 'you must log in' });
  }
  // Otherwise proceed with route
  next();
};
