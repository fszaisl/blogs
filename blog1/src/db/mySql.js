const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config/db');

const connection = mysql.createConnection(MYSQL_CONFIG);
connection.connect();

// 统一执行sql的函数
const mysqlExec = (sql) => {
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (error, result) => {
            if (error) {
                reject(error)
                return
            }
            resolve(result)
        });
    })
    return promise;
}

module.exports = {
    mysqlExec,
    escape: mysql.escape
}