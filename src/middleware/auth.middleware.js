const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = async (req, res, next) => {
    const secretKey = process.env.SECRET_JWT || "";
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    const token = req.cookies['login_token'];

    console.log(token);
}

module.exports = auth;