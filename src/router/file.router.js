const Router = require('koa-router');

const { verifyAuth } = require('../middleware/auth.middleware');
const { saveAvatar, saveMomentPicture } = require('../controller/file.controller');
const { uploadAvatar, uploadMomentPicture, momentPictureResize } = require('../middleware/file.middleware');

const router = new Router({ prefix: "/upload" });

router.post("/avatar", verifyAuth, uploadAvatar, saveAvatar);
router.post("/moment/picture", verifyAuth, uploadMomentPicture, momentPictureResize, saveMomentPicture);

module.exports = router;