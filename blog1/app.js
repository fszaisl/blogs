const _ = require('lodash');
const querystring = require('querystring');
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
    let _cookies = req.headers.cookie || '',
        cookie = {},
        cookies = [];
    cookies = _cookies.split(';');
    _.forEach(cookies, (item = '') => {
        if (item) {
            let [key, value] = item.split('=');
            key = key.trim();
            value = value.trim();
            cookie[key] = value;
        }
    });
    return cookie
}

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    const { url } = req;
    // 处理path，query
    let [path, querys] = url.split('?');
    req.path = path;
    req.query = querystring.parse(querys);
    req.cookie = getCookies(req);
    console.log(req.cookie)

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