const conn = require('../app/database');

class FileService {
    async uploadAvatar(filename, mimetype, size, userId) {
        const statement = "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);";
        const [result] = await conn.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }
}

module.exports = new FileService();