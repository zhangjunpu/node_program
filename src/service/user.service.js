const conn = require("../app/database");

class UserService {
    async createUser(username, password) {
        const statement = "INSERT INTO `user` (name, password) VALUES (?, ?);"
        const result = await conn.execute(statement, [username, password]);
        return result[0];
    }

    async getUserByName(username) {
        const statement = "SELECT * FROM `user` WHERE name = ?";
        const result = await conn.execute(statement, [username]);
        return result[0][0];
    }
}

module.exports = new UserService();