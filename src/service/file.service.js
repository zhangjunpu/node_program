const conn = require('../app/database');

class FileService {
    async uploadAvatar(filename, mimetype, size, userId) {
        const statement = "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);";
        const [result] = await conn.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }

    async getAvatar(userId) {
        const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
        const [result] = await conn.execute(statement, [userId]);
        return result[0];
    }
}

module.exports = new FileService();