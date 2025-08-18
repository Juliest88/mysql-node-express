import { dbQuery } from "../db/index.js";
import { multipleColumnSet } from "../utils/common.utils.js";
import Role from "../utils/userRoles.utils.js";

class UserModel {
  tableName = "user";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await dbQuery(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await dbQuery(sql, values);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`;
    const [result] = await dbQuery(sql, values);
    return result;
  };

  create = async ({
    username,
    password,
    first_name,
    last_name,
    email,
    role = Role.SuperUser,
    age = 0,
  }) => {
    const sql = `
            INSERT INTO ${this.tableName} 
            (username, password, first_name, last_name, email, role, age) 
            VALUES (?,?,?,?,?,?,?)
        `;
    const params = [
      username,
      password,
      first_name,
      last_name,
      email,
      role,
      age,
    ];
    const result = await dbQuery(sql, params);
    return result?.affectedRows || 0;
  };

  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;
    return await dbQuery(sql, [...values, id]);
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await dbQuery(sql, [id]);
    return result?.affectedRows || 0;
  };
}

export default new UserModel();
