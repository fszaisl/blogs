const { mysqlExec, escape } = require('../db/mySql');
const { encryption } = require('../utils/crypto');
const xss = require('xss');
const _ = require('lodash');

const loginToBlog = (params = {}) => {
    let { username, password } = params;
    username = escape(username); // 预防sql注入
    console.log(password)
    password = encryption(password) // 密码加密
    const sql = `select id,username,realname from users where username=${username} and password='${password}' ;`
    console.log(sql)
    return mysqlExec(sql).then((rows = []) => {
        if (rows[0]) {
            return rows[0]
        }
        return '登录失败请重试';
    });
};

const register = (params = {}) => {
    let { username, realname, password } = params;
    username = xss(username); // 预防xss攻击
    username = escape(username); // 预防sql注入
    realname = xss(realname); // 预防xss攻击
    realname = escape(realname); // 预防sql注入
    password = encryption(password) // 密码加密
    const checkUserSql = `select username from users where username=${username} `;
    const insertSql = `insert into users (username,realname,password) values (${username},${realname},'${password}') `
    return mysqlExec(checkUserSql)
        .then((rows) => {
            if (rows.length > 0) {
                return Promise.reject('用户名已存在')
            }
            return mysqlExec(insertSql)
        })
        .then(result => {
            let { insertId, affectedRows } = result;
            // console.log(result)
            if (affectedRows > 0) {
                return { id: insertId }
            }
            Promise.reject('注册失败，请重试')
        });
}


module.exports = { loginToBlog, register };