const { createLogger, format, transports } = require('winston');

const consoleFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
);

const fileFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
);

const logger = createLogger({
  level: 'info',
  transports: [
    new transports.Console({ format: consoleFormat }),
    new transports.File({ filename: 'logs/app.log', format: fileFormat })
  ],
});

module.exports = logger;
