const Result = require("../app/result");
const momentService = require("../service/moment.service");

class MonentController {
    async create(ctx, next) {
        console.log("moment create");
        const { id } = ctx.user;
        const { content } = ctx.request.body;
        const result = await momentService.create(id, content);
        ctx.body = new Result(null, null, result);
    }

    async getMomentById(ctx, next) {
        console.log("moment getMomentById");
        const { momentId } = ctx.params;
        const result = await momentService.getMomentById(momentId);
        ctx.body = new Result(null, null, result);
    }

    async getMomentList(ctx, next) {
        console.log("moment getMomentList");
        const { pageNum, pageSize } = ctx.query;
        const result = await momentService.getMomentList(pageNum, pageSize);
        ctx.body = new Result(null, null, result);
    }
}

module.exports = new MonentController();