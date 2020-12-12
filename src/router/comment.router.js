const Router = require('koa-router');
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware');
const { create, update, remove } = require('../controller/comment.controller');

const router = new Router({ prefix: "/comment" });

router.post("/", verifyAuth, create);
router.patch("/:commentId", verifyAuth, verifyPermission, update);
router.delete("/:commentId", verifyAuth, verifyPermission, remove);

module.exports = router;