import { dbQuery } from "../db/index.js";
import { multipleColumnSet } from "../utils/common.utils.js";
import Role from "../utils/userRoles.utils.js";

class UserModel {
  #tableName = "user";

  async find(params = {}) {
    let sql = `SELECT * FROM ${this.#tableName}`;

    if (!Object.keys(params).length) {
      return await dbQuery(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await dbQuery(sql, values);
  }

  async findOne(params) {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `SELECT * FROM ${this.#tableName} WHERE ${columnSet}`;
    const [result] = await dbQuery(sql, values);
    return result;
  }

  async create({
    username,
    password,
    first_name,
    last_name,
    email,
    role = Role.SuperUser,
    age = 0,
  }) {
    const sql = `
            INSERT INTO ${this.#tableName} 
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
  }

  async update(params, id) {
    const { columnSet, values } = multipleColumnSet(params);
    const sql = `UPDATE ${this.#tableName} SET ${columnSet} WHERE id = ?`;
    return await dbQuery(sql, [...values, id]);
  }

  async delete(id) {
    const sql = `DELETE FROM ${this.#tableName} WHERE id = ?`;
    const result = await dbQuery(sql, [id]);
    return result?.affectedRows || 0;
  }
}

export default new UserModel();
