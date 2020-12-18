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

        const avatar = `${APP_HOST}:${APP_PORT}/user/avatar/${filename}`;
        await userService.updateUserAvatar(avatar, userId);

        ctx.body = new Result(null, "头像上传成功");
    }

    async saveMomentPicture(ctx, next) {
        console.log("保存动态配图");
        const userId = ctx.user.id;
        const { momentId } = ctx.req.body;
        const files = ctx.req.files;
        for (const file of files) {
            const { filename, mimetype, size } = file;
            await fileService.uploadMomentPicture(filename, mimetype, size, userId, momentId);
        }

        ctx.body = new Result(null, "图片上传成功");
    }
}

module.exports = new FileController();