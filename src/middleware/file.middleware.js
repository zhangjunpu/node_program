const multer = require('koa-multer');
const { AVATAR_PATH } = require('../constants/upload.path');

const upload = multer({ dest: AVATAR_PATH });

const uploadAvatar = upload.single("avatar");

module.exports = {
    uploadAvatar
}