import UserModel from "../models/user.model.js";
import HttpException from "./HttpException.utils.js";

/** Extract the bearer token from the authorization header */
function extractBearer(authHeader = "") {
  const header = String(authHeader).trim();
  if (!header) throw new HttpException(401, "No authorization header sent!");
  const [scheme, token] = header.split(/\s+/);
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    throw new HttpException(401, "Access denied. No credentials sent!");
  }
  return token;
}

/** Load the user from the database */
async function loadUser(decoded) {
  const userId = decoded.user_id ?? decoded.id;
  if (!userId) throw new HttpException(401, "Invalid token payload");
  // Load the user from the database
  const user = await UserModel.findOne({ id: userId });
  // If the user is not found, throw an error
  if (!user) throw new HttpException(401, "Authentication failed!");
  return user;
}

/** Check if the user has the required roles */
function checkPermissions(user, requestedId, roles = []) {
  const isOwner = String(requestedId) === String(user.id);
  if (!isOwner && roles.length && !roles.includes(user.role)) {
    throw new HttpException(403, "Forbidden");
  }
}

export { checkPermissions, extractBearer, loadUser };
