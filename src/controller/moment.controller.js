const fs = require('fs');
const path = require('path');

const Result = require("../app/result");
const momentService = require("../service/moment.service");
const fileService = require('../service/file.service');
const { FILE_PATH } = require('../constants/file.path');

class MonentController {
    async create(ctx, next) {
        console.log("创建动态");
        const userId = ctx.user.id;
        const { content } = ctx.request.body;
        const result = await momentService.create(content, userId);
        ctx.body = new Result(null, null, result);
    }

    async find(ctx, next) {
        console.log("moment getMomentById");
        const { momentId } = ctx.params;
        const result = await momentService.getMomentById(momentId);
        ctx.body = new Result(null, null, result);
    }

    async list(ctx, next) {
        console.log("moment getMomentList");
        const { page, pageSize } = ctx.query;
        const result = await momentService.getMomentList(page, pageSize);
        ctx.body = new Result(null, null, result);
    }

    async update(ctx, next) {
        console.log("更新moment");
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        const result = await momentService.update(momentId, content);
        ctx.body = new Result(null, null, result);
    }

    async remove(ctx, next) {
        console.log("删除moment");
        const { momentId } = ctx.params;
        const result = await momentService.remove(momentId);
        ctx.body = new Result(null, null, result);
    }

    async labels(ctx, next) {
        console.log("给动态加标签");
        const { momentId } = ctx.params;
        for (const { id } of ctx.labels) {
            // 1. 查看当前用户是否拥有此标签
            const hasLabel = await momentService.hasLabel(momentId, id);
            // 2. 如果没有则插入
            if (!hasLabel) {
                await momentService.addLabel(momentId, id);
            }
        }
        ctx.body = new Result(null, "添加标签成功");
    }

    /**
     * 获取动态图片
     */
    async getPicture(ctx, next) {
        console.log("获取动态配图");
        let { filename } = ctx.params;
        const resize = ctx.query.size;
        const { mimetype, size } = await fileService.getFileInfo(filename);
        if (resize === '1280') {
            filename += "-large";
        } else if (resize === '640') {
            filename += "-middle";
        } else if (resize === '320') {
            filename += "-small";
        }
        ctx.response.set('content-type', mimetype);
        ctx.response.set('content-size', size);
        ctx.body = fs.createReadStream(path.resolve(FILE_PATH, filename));
    }
}

module.exports = new MonentController();