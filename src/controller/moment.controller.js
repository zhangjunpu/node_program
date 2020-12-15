const Result = require("../app/result");
const service = require("../service/moment.service");

class MonentController {
    async create(ctx, next) {
        console.log("创建动态");
        const userId = ctx.user.id;
        const { content } = ctx.request.body;
        const result = await service.create(content, userId);
        ctx.body = new Result(null, null, result);
    }

    async find(ctx, next) {
        console.log("moment getMomentById");
        const { momentId } = ctx.params;
        const result = await service.getMomentById(momentId);
        ctx.body = new Result(null, null, result);
    }

    async list(ctx, next) {
        console.log("moment getMomentList");
        const { page, pageSize } = ctx.query;
        const result = await service.getMomentList(page, pageSize);
        ctx.body = new Result(null, null, result);
    }

    async update(ctx, next) {
        console.log("更新moment");
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await service.update(momentId, content);
        ctx.body = new Result(null, null, result);
    }

    async remove(ctx, next) {
        console.log("删除moment");
        const { momentId } = ctx.params;
        const result = await service.remove(momentId);
        ctx.body = new Result(null, null, result);
    }

    async labels(ctx, next) {
        const { momentId } = ctx.params;
        console.log("给动态加标签");
        for (const { id } of ctx.labels) {
            // 1. 查看当前用户是否拥有此标签
            const hasLabel = await service.hasLabel(momentId, id);
            // 2. 如果没有则插入
            if (!hasLabel) {
                await service.addLabel(momentId, id);
            }
        }
        ctx.body = new Result(null, "添加标签成功");
    }
}

module.exports = new MonentController();