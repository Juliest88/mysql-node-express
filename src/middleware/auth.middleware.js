const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (roles = [], onlyAdmin = false) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.split(' ')[1];
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });

            if (!user) {
                throw new HttpException(404, 'Authentication failed!');
            }

            // check if the route is only for an admin,
            // check if the current user is the owner user
            const ownerAuthorized = !onlyAdmin && req.params.id == user.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
                throw new HttpException(401, 'Unauthorized');
            }

            // if the user have permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;