const Router = require("koa-router");
const { create } = require("../controller/user.controller");
const { verifyCreate } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/users" });

router.post("/", verifyCreate, create);

module.exports = router;