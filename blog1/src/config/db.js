const env = process.env.NODE_ENV //环境变量

let MYSQL_CONFIG = {};
if (env === 'dev') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'fsz#1984929',
        database: 'myblog',
        insecureAuth : true
    };
}

if (env === 'production') {
    MYSQL_CONFIG = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'fsz#1984929',
        database: 'myblog'
    };
}

module.exports = {
    MYSQL_CONFIG
};