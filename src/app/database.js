const mysql = require("mysql2");
const config = require("../app/config");

const connection = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_DATABASE,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
});

connection.getConnection((err, conn) => {
    if (err) console.log(err);
    conn.connect((err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("数据库连接成功");
    });
});

module.exports = connection.promise();