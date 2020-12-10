const mysql = require("mysql2");
require("../app/config");

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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