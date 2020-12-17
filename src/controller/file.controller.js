const fileService = require('../service/file.service');
const userService = require("../service/user.service");
const Result = require('../app/result');
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController {
    async saveAvatar(ctx, next) {
        console.log("保存头像");
        const userId = ctx.user.id;
        const { filename, mimetype, size } = ctx.req.file;
        await fileService.uploadAvatar(filename, mimetype, size, userId);

        const avatar = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`;
        await userService.updateUserAvatar(avatar, userId);

        ctx.body = new Result(null, "头像上传成功");
    }
}

module.exports = new FileController();