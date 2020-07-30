const query = require('../db/db-connection');
const { getPlaceholderStringForArray } = require('../utils/common.utils');
class UserModel {
    tableName = 'user';

    getAllUsers = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        const result = await query(sql);

        return result;
    }

    getUserByName = async (name) => {
        const sql = `SELECT * FROM ${this.tableName}
        WHERE name = ?`;
        const result = await query(sql, [name]);

        return result;
    }

    addUser = async (name = '', age = 0, email = '') => {
        const sql = `INSERT INTO ${this.tableName}
        (name, age, email) VALUES (?,?,?)`;

        const result = await query(sql, [name, age, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;