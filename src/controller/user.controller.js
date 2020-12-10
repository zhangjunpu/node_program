const { createUser } = require("../service/user.service");
const Result = require("../app/result");
const passwordToMd5 = require("../utils/crypto");

class UserController {
    async create(ctx, next) {
        const { username, password } = ctx.request.body;
        const pwd = passwordToMd5(password);
        const result = new Result();
        result.data = await createUser(username, pwd);
        ctx.body = result;
    }
}

module.exports = new UserController();