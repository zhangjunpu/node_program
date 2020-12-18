const path = require("path");

const multer = require("koa-multer");
const Jimp = require("jimp");

const { AVATAR_PATH, FILE_PATH } = require('../constants/file.path');

const avatarUpload = multer({ dest: AVATAR_PATH });
const uploadAvatar = avatarUpload.single("avatar");

const fileUpload = multer({ dest: FILE_PATH });
const uploadMomentPicture = fileUpload.array("file", 9);

const momentPictureResize = async (ctx, next) => {
    console.log("动态配图尺寸处理");

    const files = ctx.req.files;
    for (const { filename } of files) {
        const filePath = path.resolve(FILE_PATH, filename);
        console.log(filePath);
        Jimp.read(filePath).then(res => {
            res.resize(1280, Jimp.AUTO).write(path.resolve(FILE_PATH, `${filename}-large`));
            res.resize(640, Jimp.AUTO).write(path.resolve(FILE_PATH, `${filename}-middle`));
            res.resize(320, Jimp.AUTO).write(path.resolve(FILE_PATH, `${filename}-small`));
        }).catch(err => {
            console.log(err);
        })
    }
    await next();
}

module.exports = {
    uploadAvatar,
    uploadMomentPicture,
    momentPictureResize
}