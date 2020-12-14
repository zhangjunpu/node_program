const conn = require("../app/database");
const { getPage } = require("../utils/page");

class LabelService {
    async isLableExists(name) {
        const statement = "SELECT * FROM label WHERE name = ?;";
        const [result] = await conn.execute(statement, [name]);
        return result[0];
    }

    async create(name) {
        const statement = "INSERT INTO label (name) VALUES (?);";
        const [result] = await conn.execute(statement, [name]);
        return result;
    }

    async getLabels(pageNum, pageSize) {
        const page = getPage(pageNum, pageSize);
        const statement = "SELECT * FROM label LIMIT ?, ?";
        const [result] = await conn.execute(statement, [page, pageSize]);
        return result;
    }
}

module.exports = new LabelService();