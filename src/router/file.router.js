const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { saveAvatar } = require('../controller/file.controller');
const { uploadAvatar } = require('../middleware/file.middleware');

const router = new Router({ prefix: "/upload" });

router.post("/avatar", verifyAuth, uploadAvatar, saveAvatar);

module.exports = router;