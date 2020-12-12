const conn = require("../app/database");

class AuthService {
    async checkPermission(tableName, id, userId) {
        const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_Id = ?`;
        const [result] = await conn.execute(statement, [id, userId]);
        return result;
    }
}

module.exports = new AuthService();