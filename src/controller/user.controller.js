const fs = require('fs');
const path = require('path');

const userService = require("../service/user.service");
const fileService = require("../service/file.service");
const Result = require("../app/result");
const passwordToMd5 = require("../utils/crypto");
const { AVATAR_PATH } = require('../constants/file.path');
const { getAvatarUrl } = require("../utils/image");

class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const pwd = passwordToMd5(password);
        const result = new Result();
        result.data = await userService.createUser(username, pwd);
        ctx.body = result;
    }

    async getUserAvatar(ctx, next) {
        const { filename } = ctx.params;
        const { mimetype, size } = await fileService.getAvatar(filename);
        ctx.response.set("content-type", mimetype);
        ctx.response.set("content-size", size);
        ctx.body = fs.createReadStream(path.resolve(AVATAR_PATH, filename));
    }

    async getUserInfo(ctx, next) {
        const userId = ctx.user.id;
        const { id, name } = await userService.getUserInfo(userId);
        const avatar = getAvatarUrl(id);
        ctx.body = new Result(null, null, { id, name, avatar })
    }

}

module.exports = new UserController();