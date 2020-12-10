const conn = require("../app/database");

async function createUser(username, password) {
    const statement = "INSERT INTO `users` (name, password) VALUES (?, ?);"
    const result = await conn.execute(statement, [username, password]);
    return result[0];
}

async function getUserByName(username) {
    const statement = "SELECT * FROM users WHERE name = ?";
    const result = await conn.execute(statement, [username]);
    return result[0][0];
}

module.exports = {
    createUser,
    getUserByName,
}