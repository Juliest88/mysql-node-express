const HttpException = require('../utils/HttpException.utils');

module.exports = (req, res, next) => {
  next(new HttpException(404, 'Endpoint Not Found'));
};