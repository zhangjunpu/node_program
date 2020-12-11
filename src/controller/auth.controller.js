const Result = require("../app/result");
const jwt = require('jsonwebtoken');
const { sign } = require("../app/token");

class AuthController {
    async login(ctx, next) {
        console.log("AuthController被调用");
        const { id, name } = ctx.user;
        const token = sign({ id, name });
        const result = { id, name, token };
        ctx.body = new Result(null, "用户登录成功", result);;
    }
}

module.exports = new AuthController();