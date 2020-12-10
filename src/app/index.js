const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const errorHandler = require("./error.handler");
const applyRouters = require("../router/index");

const app = new Koa();

app.use(bodyparser());
applyRouters(app);
app.on("error", errorHandler);

module.exports = app;