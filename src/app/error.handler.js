const errorTypes = require("../constants/error");
const Result = require("../app/result");

const errorHandler = (err, ctx) => {
    switch (err.message) {
        case errorTypes.USERNAME_AND_PASSWORD_MUST_NOT_BE_NULL:
            ctx.body = new Result(10001, "用户名和密码不能为空");
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            ctx.body = new Result(10002, "用户已经存在");
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            ctx.body = new Result(10003, "用户不存在");
            break;
        case errorTypes.PASSWORD_IS_WRONG:
            ctx.body = new Result(10004, "密码错误");
            break;
        case errorTypes.UNAUTHORIZED:
            ctx.status = 401;
            ctx.body = new Result(10010, "没有授权");
            break;
        case errorTypes.TOKEN_EXPIRED:
            ctx.status = 401;
            ctx.body = new Result(10011, "Token失效");
            break;
        case errorTypes.NO_PERMISSION:
            ctx.status = 401;
            ctx.body = new Result(10012, "没有权限");
            break;
        default:
            ctx.status = 400;
            ctx.body = new Result(10020, err.message);
            break;
    }
}

module.exports = errorHandler;