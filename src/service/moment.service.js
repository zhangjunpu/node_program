const conn = require("../app/database");

class MomentService {
    async create(id, content) {
        const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
        const result = await conn.execute(statement, [content, id]);
        return result[0];
    }

    async getMomentById(id) {
        const statement = `
        SELECT m.id, m.content, m.createAt, m.updateAt, JSON_OBJECT("id", u.id, "name", u.name)
        FROM moment m LEFT JOIN user u ON m.user_id = u.id WHERE m.id = ?;`;
        const result = await conn.execute(statement, [id]);
        return result[0];
    }

    async getMomentList(pageNum, pageSize) {
        const offset = ((pageNum - 1) * pageSize).toString();
        console.log(offset, pageSize);
        const statement = `
        SELECT m.id, m.content, m.createAt, m.updateAt, JSON_OBJECT("id", u.id, "name", u.name) user
        FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ?, ?;`;
        const result = await conn.execute(statement, [offset, pageSize]);
        console.log(result);
        return result[0];
    }
}

module.exports = new MomentService();