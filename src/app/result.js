
class Result {
    constructor(code, msg, data) {
        this.code = code || 10000;
        this.msg = msg || "执行成功";
        this.data = data || null;
    }
}

module.exports = Result;