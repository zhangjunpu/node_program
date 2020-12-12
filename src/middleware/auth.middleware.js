const errorTypes = require("../constants/error");
const { getUserByName } = require("../service/user.service");
const passwordToMd5 = require("../utils/crypto");
const { verify } = require("../app/token");
const { checkPermission } = require("../service/auth.service");

/**
 * 验证登录
 */
async function verifyLogin(ctx, next) {
    const { username, password } = ctx.request.body;
    // 验证是否为null
    if (!username || !password) {
        const error = new Error(errorTypes.USERNAME_AND_PASSWORD_MUST_NOT_BE_NULL);
        return ctx.app.emit("error", error, ctx);
    }

    // 用户是否存在
    const user = await getUserByName(username);
    if (!user) {
        const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
        return ctx.app.emit("error", error, ctx);
    }

    // 密码是否相同
    if (user.password !== passwordToMd5(password)) {
        const error = new Error(errorTypes.PASSWORD_IS_WRONG);
        return ctx.app.emit("error", error, ctx);
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
    let result = null;
    try {
        result = verify(token);
    } catch (error) {
        return ctx.app.emit("error", error, ctx);
    }

    ctx.user = result;
    await next();
}

/**
 * 验证权限
 */
async function verifyPermission(ctx, next) {
    console.log("验证权限");
    const [keys] = Object.keys(ctx.params);
    const tableName = keys.replace("Id", "");
    const id = ctx.params[keys];
    const userId = ctx.user.id;
    const result = await checkPermission(tableName, id, userId);
    if (!result || !result.length) {
        const error = new Error(errorTypes.NO_PERMISSION);
        return ctx.app.emit("error", error, ctx);
    }
    await next();
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}