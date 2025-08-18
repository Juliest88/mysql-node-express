import app from "./app.js";
import config from "./config/index.js";
import { closeDb } from "./db/index.js";
import logger from "./utils/logger.utils.js";

const { port } = config;

const server = app.listen(port, () => {
  logger.info(`🚀 Server running on port ${port}!`);
});

// Graceful shutdown handler for production environment
async function shutdown(signal) {
  logger.info(`${signal} received. Shutting down...`);
  server.close(async () => {
    await closeDb();
    logger.info("Closed server & DB");
    process.exit(0);
  });

  // if the server is not closed within 10 seconds, exit the process
  setTimeout(() => process.exit(1), 10_000).unref();
}

["SIGINT", "SIGTERM"].forEach((s) => process.on(s, () => shutdown(s)));
