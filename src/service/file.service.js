const conn = require('../app/database');

class FileService {
    async uploadAvatar(filename, mimetype, size, userId) {
        const statement = "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);";
        const [result] = await conn.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }

    async getAvatar(filename) {
        const statement = `SELECT * FROM avatar WHERE filename = ?;`;
        const [result] = await conn.execute(statement, [filename]);
        return result[0];
    }

    async uploadMomentPicture(filename, mimetype, size, userId, momentId) {
        const statement = "INSERT INTO file (filename, mimetype, size, user_id, moment_id) VALUES (?, ?, ?, ?, ?);";
        const [result] = await conn.execute(statement, [filename, mimetype, size, userId, momentId]);
        return result;
    }

    async getFileInfo(filename) {
        const statement = 'SELECT * FROM file WHERE filename = ?';
        const [result] = await conn.execute(statement, [filename]);
        return result[0];
    }
}

module.exports = new FileService();