const swaggerJsdoc = require('swagger-jsdoc');
const { port } = require('./index');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MySQL Node Express API',
      version: '1.0.0',
      description: 'API documentation for MySQL Node Express project',
    },
    servers: [{ url: `http://localhost:${port}` }],
  },
  apis: ['./src/routes/*.route.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
module.exports = { swaggerSpec };