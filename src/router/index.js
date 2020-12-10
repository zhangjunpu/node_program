const fs = require("fs");
const path = require("path");

const applyRouters = (app) => {
    const filename = path.basename(__filename);
    fs.readdirSync(__dirname).forEach(item => {
        if (filename !== item) {
            const router = require(`./${item}`);
            app.use(router.routes());
            app.use(router.allowedMethods());
        }
    });
}

module.exports = applyRouters;