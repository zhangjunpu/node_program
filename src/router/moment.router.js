const Router = require("koa-router");

const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { verifyLabels } = require("../middleware/label.middleware");
const { create, find, list, update, remove, labels, getPicture } = require("../controller/moment.controller.js");

const router = new Router({ prefix: "/moment" });

router.post("/", verifyAuth, create);
router.get("/", verifyAuth, list);
router.get("/:momentId", verifyAuth, find);
router.patch("/:momentId", verifyAuth, verifyPermission, update);
router.delete("/:momentId", verifyAuth, verifyPermission, remove);
router.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabels, labels);
router.get("/image/:filename", getPicture);

module.exports = router;