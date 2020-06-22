const { mysqlExec } = require('../db/mySql');

const loginToBlog = (username, password) => {
    const sql = `select * from users where username='${username}' and password='${password}' ;`
    return mysqlExec(sql).then((rows = []) => {
        if (rows[0]) {
            return rows[0]
        }
        return Promise.reject();
    });
};

module.exports = { loginToBlog };