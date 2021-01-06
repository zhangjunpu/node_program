const Result = require("../app/result");
const { sign } = require("../app/token");

class AuthController {
    async login(ctx, next) {
        console.log("AuthController被调用");
        const { id, name, avatar } = ctx.user;
        let token = null;
        try {
            token = sign({ id, name });
        } catch (error) {
            ctx.app.emit("error", error, ctx);
        }
        const result = { id, name, avatar, token };
        ctx.body = new Result(null, "用户登录成功", result);;
    }
}

module.exports = new AuthController();