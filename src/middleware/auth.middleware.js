const jwt = require("jsonwebtoken");
const config = require("../config");
const {
  extractBearer,
  loadUser,
  checkPermissions,
} = require("../utils/auth.utils");

/**
 * Middleware to check if the user is authenticated and has the required roles
 * @param  {...any} roles
 * @returns {function}
 */
const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const { secret, algorithm } = config.jwt || {};
      if (!secret || !algorithm) throw new Error("JWT config missing");

      // Extract the bearer token from the authorization header
      const authHeader = req.headers.authorization;
      const token = extractBearer(authHeader);

      // Verify the token
      const decoded = jwt.verify(token, secret, { algorithms: [algorithm] });
      const user = await loadUser(decoded);

      // Check if the user has the required roles
      checkPermissions(user, req.params.id, roles);

      // Set the current user
      req.currentUser = user;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = auth;
