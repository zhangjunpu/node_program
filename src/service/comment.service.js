const conn = require('../app/database');

class CommentService {
    async create(content, momentId, userId) {
        const statement = "INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?)";
        const [result] = await conn.execute(statement, [content, momentId, userId]);
        return result;
    }

    async update(commentId, content) {
        const statement = "UPDATE comment SET content = ? WHERE id = ?";
        const [result] = await conn.execute(statement, [content, commentId]);
        return result;
    }

    async remove(commentId) {
        const statement = "DELETE FROM comment WHERE id = ?";
        const [result] = await conn.execute(statement, [commentId]);
        return result;
    }

    async getCommentsByMomentId(momentId) {

    }

    
}

module.exports = new CommentService();