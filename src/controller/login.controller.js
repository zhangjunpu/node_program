const Result = require("../app/result");
const { getUserByName } = require("../service/user.service");

class LoginController {
    async login(ctx, next) {
        const { username, password } = ctx.request.body;
        const user = await getUserByName(username);
        const result = new Result(null, "用户登录成功", user);
        ctx.body = result;
    }
}

module.exports = new LoginController();