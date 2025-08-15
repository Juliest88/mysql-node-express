const mysql2 = require('mysql2');
const config = require('../config');
const logger = require('../utils/logger.utils');
const { db } = require('../config');

class DBConnection {
    constructor() {
        this.db = mysql2.createPool(db);

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    logger.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    logger.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    logger.error('Database connection was refused.');
                }
            }
            if (connection) {
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

// like ENUM
const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});


module.exports = new DBConnection().query;