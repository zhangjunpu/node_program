const Result = require("../app/result");
const service = require("../service/label.service");

class LabelController {
    async getLabels(ctx, next) {
        const { pageNum, pageSize } = ctx.request.query;
        const result = await service.getLabels(pageNum, pageSize);
        ctx.body = new Result(null, null, result);
    }
}

module.exports = new LabelController();