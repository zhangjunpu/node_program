const Result = require("../app/result");
const service = require("../service/moment.service");

class MonentController {
    async create(ctx, next) {
        console.log("moment create");
        const { id } = ctx.user;
        const { content } = ctx.request.body;
        const result = await service.create(id, content);
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
        const { pageNum, pageSize } = ctx.query;
        const result = await service.getMomentList(pageNum, pageSize);
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
}

module.exports = new MonentController();