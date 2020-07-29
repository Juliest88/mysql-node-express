const query = require('../db/db-connection');

class UserModel {
    tableName = 'user';

    getAllUsers = async () => {
        const sql = 'SELECT * FROM ' + this.tableName;
        const result = await query(sql);

        return result;
    }

    getUserByName = async (name) => {
        const sql = 'SELECT * FROM ' + this.tableName +
            ' WHERE name = ?';

        const result = await query(sql, [name]);

        return result;
    }
}

module.exports = new UserModel;