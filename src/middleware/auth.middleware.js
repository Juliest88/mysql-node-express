const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new HttpException(401, 'Access denied. No credentials sent!');
        }

        const token = authHeader.split(' ')[1];
        const secretKey = process.env.SECRET_JWT || "";

        // Verify Toekn
        const user = jwt.verify(token, secretKey);
        console.log(user);

        req.user = user;
        next();
    } catch (e) {
        e.status = 401;
        next(e);
    }
};

module.exports = auth;