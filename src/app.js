// Third-party dependencies
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(__dirname + '/config/swagger.yaml');

// Internal dependencies
const applySecurity = require('./middleware/security');
const router = require('./routes/index');
const notFound = require('./middleware/notFound.middleware');
const errorMiddleware = require('./middleware/error.middleware');

// Init express app
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());

// Apply security middleware
applySecurity(app);

// Main router
app.use('/api/v1', router);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 error
app.use(notFound);

// Error middleware
app.use(errorMiddleware);

module.exports = app;