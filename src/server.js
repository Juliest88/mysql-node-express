const app = require('./app');
const { port } = require('./config');
const logger = require('./utils/logger');

// starting the server
app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}!`);
});