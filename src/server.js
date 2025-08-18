import app from "./app.js";
import config from "./config/index.js";
import logger from "./utils/logger.utils.js";

const { port } = config;

// starting the server
app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}!`);
});
