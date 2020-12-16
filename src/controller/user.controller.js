const fs = require('fs');
const path = require('path');

const service = require("../service/user.service");
const Result = require("../app/result");
const passwordToMd5 = require("../utils/crypto");
const { AVATAR_PATH } = require('../constants/upload.path');

class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const pwd = passwordToMd5(password);
        const result = new Result();
        result.data = await service.createUser(username, pwd);
        ctx.body = result;
    }

    async getUserInfo(ctx, next) {
        const userId = ctx.user.id;
        const { id, name, filename, mimetype } = await service.getUserInfo(userId);
        const avatar = fs.createReadStream(path.resolve(AVATAR_PATH, filename));
        const avatarPath = avatar.path;
        ctx.body = new Result(null, null, { id, name, avatarPath })
    }

    async getUserAvatar(ctx, next) {
        const { userId } = ctx.params;
        const { filename, mimetype } = await service.getUserInfo(userId);
        const avatar = fs.createReadStream(path.resolve(AVATAR_PATH, filename));
        ctx.response.set("content-type", mimetype);
        ctx.body = avatar;
    }
}

module.exports = new UserController();