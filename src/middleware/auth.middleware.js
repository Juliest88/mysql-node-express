const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const HttpException = require('../utils/HttpException.utils');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateJWT = awaitHandlerFactory(async (req, res, next) => {
    console.log('hi');
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new HttpException(401, 'No credentials sent!');
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.SECRET_JWT || "";

    const decoded = jwt.verify(token, secretKey);

    console.log(decoded);
    next();
});

module.exports = authenticateJWT;