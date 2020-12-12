const conn = require("../app/database");

const SELECT_SQL = `SELECT 
m.id, m.content, m.createAt, m.updateAt, JSON_OBJECT("id", u.id, "name", u.name) user 
FROM moment m 
LEFT JOIN user u ON m.user_id = u.id`;

class MomentService {

    async create(id, content) {
        const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
        const [result] = await conn.execute(statement, [content, id]);
        return result;
    }

    async getMomentById(id) {
        const statement = `${SELECT_SQL} WHERE m.id = ?;`;
        const [result] = await conn.execute(statement, [id]);
        return result[0];
    }

    async getMomentList(pageNum, pageSize) {
        const offset = ((pageNum - 1) * pageSize).toString();
        const statement = `${SELECT_SQL} LIMIT ?, ?;`;
        const [result] = await conn.execute(statement, [offset, pageSize]);
        return result;
    }

    async update(momentId, content) {
        const statement = "UPDATE moment SET content = ? WHERE id = ?";
        const [result] = await conn.execute(statement, [content, momentId]);
        return result;
    }

    async remove(momentId) {
        const statement = "DELETE FROM moment WHERE id = ?";
        const [result] = await conn.execute(statement, [momentId]);
        return result;
    }
}

module.exports = new MomentService();