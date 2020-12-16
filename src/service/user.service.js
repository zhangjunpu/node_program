const conn = require("../app/database");

class UserService {
    async createUser(username, password) {
        const statement = "INSERT INTO `user` (name, password) VALUES (?, ?);"
        const [result] = await conn.execute(statement, [username, password]);
        return result;
    }

    async getUserByName(username) {
        const statement = "SELECT * FROM `user` WHERE name = ?";
        const [result] = await conn.execute(statement, [username]);
        return result[0];
    }

    async getUserInfo(userId) {
        const statement = `
            SELECT
                u.id, u.name, a.filename, a.mimetype, a.size
            FROM user u
            LEFT JOIN avatar a ON u.id = a.user_id
            WHERE u.id = ?;
    `;
        const [result] = await conn.execute(statement, [userId]);
        return result[0];
    }
}

module.exports = new UserService();