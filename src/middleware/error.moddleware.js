const HttpException = require('../utils/HttpException.utils');


function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    // SQL error will change the status code (default is 500)
    status = error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD' ? 400 : status;

    console.error('[ERROR] ', status, message, data ? data : '');

    // If status code is 500 - change the message to Intrnal server error
    message = status === 500 || !message ? 'Internal server error' : message;

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
    data: {...} // optional
}
*/