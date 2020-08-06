const query = require('../db/db-connection');
const { multipleColumnSet, getPlaceholderStringForArray } = require('../utils/common.utils');
class UserModel {
    tableName = 'user';

    getAllUsers = async () => {
        const sql = `SELECT * FROM ${this.tableName}`;
        const result = await query(sql);

        return result;
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    createUser = async ({ username, password, first_name, last_name, email, age }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, email, age) VALUES (?,?,?,?,?,?)`;

        const result = await query(sql, [username, password, first_name, last_name, email, age]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    updateUser = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    deleteUser = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;