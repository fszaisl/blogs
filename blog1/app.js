const _ = require('lodash');
const querystring = require('querystring');
const { v5: uuidv5 } = require('uuid');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');


const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        const { method, headers } = req;

        if (method !== 'POST') {
            resolve({});
            return
        }
        if (headers['content-type'] !== 'application/json') {
            resolve({});
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve(postData);
                return;
            }
            resolve(JSON.parse(postData));
        });

    });
};

const getCookies = (req) => {
    let cookieStr = req.headers.cookie || '',
        cookie = {},
        cookieList = [];
    cookieList = cookieStr.split(';');
    _.forEach(cookieList, item => {
        if (item) {
            let [key, value] = item.split('=');
            key = key.trim();
            value = value.trim();
            cookie[key] = value;
        }
    })
    return cookie;
};

const SESSION_DATA = {};

const serverHandle = (req, res) => {
    // 设置返回格式
    // res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { url } = req;
    // 处理path，query
    let [path, querys] = url.split('?');
    req.path = path;
    req.query = querystring.parse(querys);
    req.cookie = getCookies(req);

    // 解析session
    let sessionId = req.cookie.sessionId;
    if (!sessionId) {
        sessionId = uuidv5();
    }
    if (!SESSION_DATA[sessionId]) {
        SESSION_DATA[sessionId] = {};
    }
    req.session = SESSION_DATA[sessionId];
    console.log(`sessionId==`, sessionId)
    console.log(`req.session==`, req.session)
    console.log(`SESSION_DATA==`, SESSION_DATA)

    getPostData(req).then(postData => {
        req.body = postData;
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData));
            });
            return
        }

        const userResult = handleUserRouter(req, res);
        if (userResult) {
            userResult.then(userData => {
                res.end(JSON.stringify(userData));
            });
            return
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end()
    });
};

module.exports = serverHandle;