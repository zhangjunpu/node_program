const service = require('../service/file.service');
const Result = require('../app/result');

class FileController {
    async saveAvatar(ctx, next) {
        const { id } = ctx.user;
        const { filename, mimetype, size } = ctx.req.file;
        const result = await service.uploadAvatar(filename, mimetype, size, id);
        ctx.body = new Result(null, null, result);
    }
}

module.exports = new FileController();