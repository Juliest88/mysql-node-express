const express = require("express");
const applySecurity = require('./middleware/security');
const router = require('./routes/index');
const notFound = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./config/swagger');

// Init express
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

// Apply security middleware
applySecurity(app);

app.use('/api/v1', router);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 error
app.use(notFound);

// Error middleware
app.use(errorMiddleware);

module.exports = app;