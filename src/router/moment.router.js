const Router = require("koa-router");

const { verifyAuth } = require("../middleware/auth.middleware");
const { create, getMomentById, getMomentList } = require("../controller/moment.controller.js");

const router = new Router({ prefix: "/moment" });

router.post("/create", verifyAuth, create);
router.get("/:momentId", verifyAuth, getMomentById);
router.get("/", verifyAuth, getMomentList);

module.exports = router;