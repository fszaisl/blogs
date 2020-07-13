const { mysqlExec, escape } = require('../db/mySql');
const { encryption } = require('../utils/crypto');

const loginToBlog = (username, password) => {
    let _username = escape(username); // 预防sql注入
    console.log(encryption(password)); // 密码加密，必须放到escape后面
    let _password = escape(password); // 预防sql注入
    const sql = `select id,username,realname from users where username=${_username} and password=${_password} ;`
    return mysqlExec(sql).then((rows = []) => {
        if (rows[0]) {
            return rows[0]
        }
        return Promise.reject();
    });
};

module.exports = { loginToBlog };