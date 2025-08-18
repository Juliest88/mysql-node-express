import HttpException from '../utils/HttpException.utils.js';

const notFoundMiddleware = (req, res, next) => {
  next(new HttpException(404, 'Endpoint Not Found'));
};

export default notFoundMiddleware;