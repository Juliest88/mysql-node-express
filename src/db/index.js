import mysql from "mysql2/promise";
import config from "../config/index.js";
import logger from "../utils/logger.utils.js";

const HTTP_STATUS_CODES = Object.freeze({
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
  ER_DUP_ENTRY: 409,
});

const ERROR_MESSAGES = Object.freeze({
    PROTOCOL_CONNECTION_LOST: "Database connection was closed",
    ER_CON_COUNT_ERROR: "Database has too many connections",
    ECONNREFUSED: "Database connection was refused",
    PROTOCOL_SEQUENCE_TIMEOUT: "Connection sequence timed out",
    ER_ACCESS_DENIED_ERROR: "Access denied for user",
  });

class DB {
  #pool;
  ready;

  constructor() {
    const { db: dbConfig } = config;
    if (!dbConfig) {
      throw new Error("Database configuration is missing");
    }

    this.#pool = mysql.createPool(dbConfig);
    this.ready = this.#ping();
  }

  async #ping() {
    const connection = await this.#pool.getConnection();
    try {
      await connection.ping();
      logger.info("Database connection established successfully");
      return true;
    } catch (error) {
      this.#handleConnectionError(error);
      return false;
    } finally {
      connection.release();
    }
  }

  #handleConnectionError(err) {
    const errorMessage = ERROR_MESSAGES[err.code] || "Unknown database error";
    logger.error(`Database Connection Error: ${errorMessage}`);
  }

  async query(sql, params = []) {
    try {
      await this.ready;
      const [rows] = await this.#pool.execute(sql, params);
      return rows;
    } catch (error) {
      this.#handleQueryError(error);
      throw error;
    }
  }

  #handleQueryError(err) {
    err.status = HTTP_STATUS_CODES[err.code] || 500;
    logger.error(`Database Query Error: ${err.message}`, err);
  }

  async close() {
    await this.#pool.end();
    logger.info("Database connection closed");
  }
}

export const db = new DB();
export const dbQuery = (...args) => db.query(...args);
export const closeDb = () => db.close();
export default dbQuery;
