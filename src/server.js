const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
const errorMiddleware = require('./middleware/error.middleware');
const userRouter = require('./routes/user.route');
const helmet = require('helmet'); // Added helmet middleware
const rateLimit = require('express-rate-limit'); // Added rate limiting
const hpp = require('hpp'); // Added HTTP Parameter Pollution protection
const config = require('./config'); // Added config module
const logger = require('./utils/logger'); // Added logger module
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Init express
const app = express();
app.use(helmet()); // Use helmet for security headers
app.use(hpp()); // Prevent HTTP Parameter Pollution
// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the RateLimit-* headers
    legacyHeaders: false, // Disable the X-RateLimit-* headers
});
app.use(limiter);
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

const port = Number(config.port);

app.use(`/api/v1/users`, userRouter);

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MySQL Node Express API',
      version: '1.0.0',
      description: 'API documentation for MySQL Node Express project',
    },
    servers: [
      { url: 'http://localhost:' + port }
    ],
  },
  apis: ['./src/routes/*.route.js'], // Path to the API docs
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 error
app.all('*', (req, res, next) => {
    const err = new HttpException(404, 'Endpoint Not Found');
    next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () =>
    logger.info(`🚀 Server running on port ${port}!`));


module.exports = app;