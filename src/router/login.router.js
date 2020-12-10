const Router = require("koa-router");
const { login } = require("../controller/login.controller");
const { verifyLogin } = require("../middleware/login.middleware");

const router = new Router({ prefix: "/login" });

router.post("/", verifyLogin, login);

module.exports = router;