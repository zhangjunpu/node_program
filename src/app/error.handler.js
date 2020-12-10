const errorTypes = require("../constants/error");
const Result = require("../app/result");

const errorHandler = (err, ctx) => {
    switch (err.message) {
        case errorTypes.USERNAME_AND_PASSWORD_MUST_NOT_BE_NULL:
            ctx.body = new Result(100001, "用户名和密码不能为空");
            break;
        case errorTypes.USER_ALREADY_EXISTS:
            ctx.body = new Result(100002, "用户已经存在");
            break;
        case errorTypes.USER_DOES_NOT_EXISTS:
            ctx.body = new Result(100003, "用户不存在");
            break;
        case errorTypes.PASSWORD_IS_WRONG:
            ctx.body = new Result(100004, "密码错误");
            break;
        default:
            break;
    }
}

module.exports = errorHandler;