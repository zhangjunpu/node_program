const multer = require('koa-multer');
const { AVATAR_PATH, FILE_PATH } = require('../constants/file.path');

const avatarUpload = multer({ dest: AVATAR_PATH });
const uploadAvatar = avatarUpload.single("avatar");

const fileUpload = multer({ dest: FILE_PATH });
const uploadMomentPicture = fileUpload.array("file", 9);

module.exports = {
    uploadAvatar,
    uploadMomentPicture
}