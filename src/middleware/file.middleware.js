const multer = require('koa-multer');
const { AVATAR_PATH } = require('../constants/file.path');

const upload = multer({ dest: AVATAR_PATH });

const uploadAvatar = upload.single("avatar");

module.exports = {
    uploadAvatar
}