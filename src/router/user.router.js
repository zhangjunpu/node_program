const Router = require("koa-router");
const { create, getUserInfo, getUserAvatar } = require("../controller/user.controller");
const { verifyCreate } = require("../middleware/user.middleware");
const { verifyAuth } = require('../middleware/auth.middleware');

const router = new Router({ prefix: "/user" });

router.post("/", verifyCreate, create);
router.get("/info", verifyAuth, getUserInfo);
router.get("/:userId/avatar", getUserAvatar)

module.exports = router;