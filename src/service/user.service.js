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

    async updateUserAvatar(avatar, userId) {
        const statement = `UPDATE user SET avatar = ? WHERE id = ?`;
        const [result] = await conn.execute(statement, [avatar, userId]);
        return result;
    }

    async getUserInfo(userId) {
        const statement = `SELECT id, name, avatar FROM user WHERE id = ?;`;
        const [result] = await conn.execute(statement, [userId]);
        return result[0];
    }

}

module.exports = new UserService();