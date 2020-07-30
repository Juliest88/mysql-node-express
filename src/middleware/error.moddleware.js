const HttpException = require('../utils/HttpException.utils');


function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    console.error('[ERROR] ', status, message, data ? data : '');

    if (status === 500 || !message) message = 'Internal server error';

    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found'
}
*/