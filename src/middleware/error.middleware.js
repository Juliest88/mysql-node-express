const logger = require('../utils/logger.utils');

function errorMiddleware(error, req, res, next) {
    let { status = 500, message, data } = error;

    logger.error(`[Error] ${error}`);

    // If status code is 500 - change the message to Internal server error
    message = status === 500 || !message ? 'Internal server error' : message;

    error = {
        type: 'error',
        status,
        message,
        // Removed data to prevent sensitive information leakage
    }

    res.status(status).send(error);
}

module.exports = errorMiddleware;
/*
{
    type: 'error',
    status: 404,
    message: 'Not Found',
}
*/