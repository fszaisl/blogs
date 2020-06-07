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

const serverHandle = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-Type', 'application/json');

    const { url } = req;
    // 处理path，query
    let [path, querys] = url.split('?');
    req.path = path;
    req.query = querystring.parse(querys);

    getPostData(req).then(postData => {
        req.body = postData;
        const blogData = handleBlogRouter(req, res);
        if (!_.isEmpty(blogData)) {
            res.end(JSON.stringify(blogData));
            return
        }

        const userData = handleUserRouter(req, res);
        if (!_.isEmpty(userData)) {
            res.end(JSON.stringify(userData));
            return
        }

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end()
    });
};

module.exports = serverHandle;