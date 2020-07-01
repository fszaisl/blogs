const _ = require('lodash');
const querystring = require('querystring');
const { v4: uuidv4 } = require('uuid');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const redis = require('./src/db/redis');

const getExpiresTime = () => {
    let time = Date.now();
    time += 24 * 60 * 60 * 1000;
    // time += 10 * 1000;
    return new Date(time).toUTCString();
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        const { method, headers } = req;
        if (method !== 'POST') {
            resolve({});
            return
        }
        if (!(headers['content-type'] === 'application/json' || headers['content-type'] === 'application/json;charset=UTF-8')) {
            resolve({});
            return
        }

        console.log()

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString();
        });
        req.on('end', () => {
            if (!postData) {
                resolve(postData);
                return;
            }
            console.log(`postData`, postData)
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

const setCookie = (res, sId, isSet = false) => {
    if (isSet) {
        res.setHeader('Set-Cookie', `sId=${sId}; path=/; httpOnly; expires=${getExpiresTime()}; `)
    }
}

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
    let sId = req.cookie.sId,
        needSetCookie = false;
    if (!sId) {
        sId = uuidv4();
        needSetCookie = true;
    }
    req.sessionId = sId;

    redis.get(req.sessionId).then(sessionData => {
        console.log(`sessionData===`, sessionData === null)
        if (sessionData === null) {
            req.session = {}
            redis.set(req.sessionId, {});
        } else {
            req.session = sessionData;
        }
        console.log(`SESSION_DATA==`, req.session)

        return getPostData(req);
    }).then(postData => {
        req.body = postData;
        const blogResult = handleBlogRouter(req, res);
        if (blogResult) {
            setCookie(res, sId, needSetCookie);
            blogResult.then(blogData => {
                res.end(JSON.stringify(blogData));
            });
            return
        }

        const userResult = handleUserRouter(req, res);
        if (userResult) {
            setCookie(res, sId, needSetCookie);
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