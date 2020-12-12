const Result = require('../app/result');
const service = require('../service/comment.service');

class CommentController {
    async create(ctx, next) {
        const { momentId, content } = ctx.request.body;
        const userId = ctx.user.id;
        const result = await service.create(content, momentId, userId);
        ctx.body = new Result(null, null, result);
    }

    async update(ctx, next) {
        const { commentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await service.update(commentId, content);
        ctx.body = new Result(null, null, result);
    }

    async remove(ctx, next) {
        const { commentId } = ctx.params;
        const result = await service.remove(commentId);
        ctx.body = new Result(null, null, result);
    }

    async getCommentsByMomentId(ctx, next) {

    }
}

module.exports = new CommentController();