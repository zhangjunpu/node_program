const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

module.exports = {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;

module.exports.PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "key/private.key"));
module.exports.PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "key/public.key"));