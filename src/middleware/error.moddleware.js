const HttpException = require('../utils/HttpException.utils');


function errorMiddleware(error, req, res, next) {
    let { status = 500, message } = error;
    console.error('[ERROR] ', status, message);

    res.status(status).send({
        type: 'error',
        status,
        message
    });
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
}
*/