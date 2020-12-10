const crypto = require("crypto");

function passwordToMd5(password) {
    const hash = crypto.createHash("md5");
    const result = hash.update(password).digest("hex");
    return result;
}

module.exports = passwordToMd5;