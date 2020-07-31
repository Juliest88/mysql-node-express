const query = require('../db/db-connection');
const { getPlaceholderStringForArray } = require('../utils/common.utils');
class UserModel {
    tableName = 'user';

    getAllUsers = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        const result = await query(sql);

        return result;
    }

    getUserById = async (id) => {
        const sql = `SELECT * FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);

        return result;
    }

    getUserByName = async (name) => {
        const sql = `SELECT * FROM ${this.tableName}
        WHERE name = ?`;
        const result = await query(sql, [name]);

        return result;
    }

    createUser = async (name = '', age = 0, email = '') => {
        const sql = `INSERT INTO ${this.tableName}
        (name, age, email) VALUES (?,?,?)`;

        const result = await query(sql, [name, age, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    updateUser = async (body, id) => {
        const sql = 'UPDATE user SET age = ? WHERE id = ?';

        const result = await query(sql, [body.age, id]);

        return result;
    }
}

module.exports = new UserModel;