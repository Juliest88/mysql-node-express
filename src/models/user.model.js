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
        console.log(age);
        const sql = `INSERT INTO ${this.tableName}
        (name, age, email) VALUS (?,?,?)`;

        const result = await query(sql, [name, age, email]);

        return result;
    }
}

module.exports = new UserModel;