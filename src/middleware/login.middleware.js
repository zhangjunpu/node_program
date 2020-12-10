const errorTypes = require("../constants/error");
const { getUserByName } = require("../service/user.service");
const passwordToMd5 = require("../utils/crypto");

/**
 * 验证用户是否存在
 */
async function verifyLogin(ctx, next) {
    const { username, password } = ctx.request.body;
    // 验证是否为null
    if (!username || !password) {
        const error = new Error(errorTypes.USERNAME_AND_PASSWORD_MUST_NOT_BE_NULL);
        ctx.app.emit("error", error, ctx);
        return;
    }

    // 用户是否存在
    const user = await getUserByName(username);
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        ctx.app.emit("error", error, ctx);
        return;
    }

    // 密码是否相同
    if (user.password !== passwordToMd5(password)) {
        const error = new Error(errorTypes.PASSWORD_IS_WRONG);
        ctx.app.emit("error", error, ctx);
        return;
    }

    await next();
}

module.exports = {
    verifyLogin,
}