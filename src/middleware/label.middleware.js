const labelService = require("../service/label.service");

const verifyLabels = async (ctx, next) => {
    const { labels } = ctx.request.body;
    const arrLabels = [];
    for (const name of labels) {
        // 1. 判断标签是否存在
        const label = await labelService.isLableExists(name);
        let labelId = null;
        // 2. 如果不存在，则添加标签
        if (!label) {
            const result = await labelService.create(name);
            labelId = result.insertId;
        } else {
            labelId = label.id;
        }
        arrLabels.push({ id: labelId, name });
    }
    ctx.labels = arrLabels;
    await next();
}

module.exports = {
    verifyLabels
}