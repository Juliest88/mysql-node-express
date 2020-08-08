const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            const token = authHeader.split(' ')[1];
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Toekn
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });

            // check if this user has premission to this route (only if we added roles to this route)
            if (roles.length && !roles.includes(user.role)) {
                throw new HttpException(401, 'Unauthorized');
            }

            req.user = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;



// const auth = async (req, res, next) => {
//     try {
//         const authHeader = req.headers.authorization;

//         if (!authHeader) {
//             throw new HttpException(401, 'Access denied. No credentials sent!');
//         }

//         const token = authHeader.split(' ')[1];
//         const secretKey = process.env.SECRET_JWT || "";

//         // Verify Toekn
//         const decoded = jwt.verify(token, secretKey);
//         const user = await UserModel.findOne({ id: decoded.user_id });

//         req.user = user;
//         next();
//     } catch (e) {
//         e.status = 401;
//         next(e);
//     }
// };