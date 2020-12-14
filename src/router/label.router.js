const Router = require("koa-router");
const { getLabels } = require("../controller/label.controller");

const router = new Router({ prefix: "/label" });

router.get("/", getLabels);

module.exports = router;