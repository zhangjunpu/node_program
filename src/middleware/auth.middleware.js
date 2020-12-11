const errorTypes = require("../constants/error");
const { getUserByName } = require("../service/user.service");
const passwordToMd5 = require("../utils/crypto");
const { verify } = require("../app/token");

/**
 * 验证登录
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

    ctx.user = user;
    await next();
}

/**
 * 验证token授权
 */
async function verifyAuth(ctx, next) {
    console.log("验证授权");
    const token = ctx.request.header.authorization;
    const user = verify(token);
    if (!user) {
        const error = new Error(errorTypes.NO_AUTHORIZATION);
        return ctx.app.emit("error", error, ctx);
    }
    ctx.user = user;
    await next();
}

module.exports = {
    verifyLogin,
    verifyAuth
}