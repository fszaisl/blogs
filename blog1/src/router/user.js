const { ErrorModel, SuccessModel } = require('../model/resModel');
const { loginToBlog } = require('../controller/user');
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');
const user = require('../controller/user');

const getExpiresTime = () => {
    let time = Date.now();
    time += 24 * 60 * 60 * 1000;
    // time += 10 * 1000;
    return new Date(time).toUTCString();
}

const handleUserRouter = (req, res) => {
    const { method, path, body } = req;
    if (method === 'GET' && path === '/api/user/login') {
        const { username, password } = req.query;
        console.log(`username, password==`, username, password);
        return loginToBlog(username, password).then(result => {
            Object.assign(req.session, result);

            // let { sessionId } = req.cookie;
            // let sessionData = req.session[sessionId];
            // if (_.isEmpty(sessionData)) {
            //     sessionId = uuidv4();
            // }
            // req.session[sessionId] = result;
            // res.setHeader('Set-Cookie', `sessionId=${sessionId}; path=/; httpOnly; expires=${getExpiresTime()}; `)
            return new SuccessModel('登录成功');
        }).catch(error => {
            console.log(`loginToBlog= ErrorModel ==`, error)
            return new ErrorModel('登录失败');
        });
    }

    if (method === 'GET' && path === '/api/user/test') {
        const { cookie: { sessionId } } = req;
        const sessionData = req.session[sessionId];
        if (!_.isEmpty(sessionData)) {
            console.log(`req.session`, req.session);
            return Promise.resolve(new SuccessModel(sessionData, '已经登录'))
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }


};

module.exports = handleUserRouter;