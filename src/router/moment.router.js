const Router = require("koa-router");

const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { create, find, list, update, remove } = require("../controller/moment.controller.js");

const router = new Router({ prefix: "/moment" });

router.post("/", verifyAuth, create);
router.get("/", verifyAuth, list);
router.get("/:momentId", verifyAuth, find);
router.patch("/:momentId", verifyAuth, verifyPermission, update);
router.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = router;