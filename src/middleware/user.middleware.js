const errorTypes = require("../constants/error");
const { getUserByName } = require("../service/user.service");

const verifyCreate = async (ctx, next) => {
    const { username, password } = ctx.request.body;
    // 验证是否为null
    if (!username || !password) {
        const error = new Error(errorTypes.USERNAME_AND_PASSWORD_MUST_NOT_BE_NULL);
        return ctx.app.emit("error", error, ctx);
    }

    // 验证用户是否存在
    const result = await getUserByName(username);
    if (result) {
        const error = new Error(errorTypes.USER_ALREADY_EXISTS);
        return ctx.app.emit("error", error, ctx);
    }

    await next();
}

module.exports = {
    verifyCreate,
};