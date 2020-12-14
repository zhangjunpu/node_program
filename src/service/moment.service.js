const conn = require("../app/database");

class MomentService {

    async create(content, userId) {
        const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?)";
        const [result] = await conn.execute(statement, [content, userId]);
        return result;
    }

    async getMomentById(momentId) {
        const statement = `
            SELECT 
                m.id, m.content, m.createAt, m.updateAt, 
                JSON_OBJECT("id", u.id, "name", u.name) user, 
                IF(COUNT(c.id),JSON_ARRAYAGG(
                    JSON_OBJECT("id", c.id, "content", c.content, "commentId", c.comment_id, 
                    "user", JSON_OBJECT("id", cu.id, "name", cu.name))
                ),NULL) comment 
            FROM moment m 
            LEFT JOIN user u ON m.user_id = u.id 
            LEFT JOIN comment c ON m.id = c.moment_id 
            LEFT JOIN user cu ON c.user_id = cu.id 
            WHERE m.id = ?
            GROUP BY m.id;
        `;
        try {
            const [result] = await conn.execute(statement, [momentId]);
            return result[0];
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async getMomentList(pageNum, pageSize) {
        const offset = ((pageNum - 1) * pageSize).toString();
        const statement = `
            SELECT 
                m.id, m.content, m.createAt, m.updateAt, 
                JSON_OBJECT("id", u.id, "name", u.name) user,
                (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
            FROM moment m 
            LEFT JOIN user u ON m.user_id = u.id 
            GROUP BY m.id
            LIMIT ?, ?;
        `;
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

    async hasLabel(momentId, labelId) {
        const statement = "SELECT * FROM moment_label ml WHERE ml.moment_id = ? AND ml.label_id = ?";
        const [result] = await conn.execute(statement, [momentId, labelId]);
        return result[0] ? true : false;
    }

    async addLabel(momentId, labelId) {
        const statement = "INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)";
        try {
            const [result] = await conn.execute(statement, [momentId, labelId]);
            return result;
        } catch (error) {
            console.log(error);
        }
        return null;
    }
}

module.exports = new MomentService();